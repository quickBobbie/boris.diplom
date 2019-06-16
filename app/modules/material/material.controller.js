const fs = require("fs");
const path = require('path');
const mime = require('mime');
const Material = require('./material.model');

const renameFile = (oldPath, filename) => {
    return new Promise((resolve, reject) => {
        if (!oldPath || !filename) {
            return reject("No path or filename");
        }
        let newPath = path.join(path.dirname(oldPath), filename);
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(newPath);
        })
    });
};

const exists = (dir) => {
    return new Promise((resolve, reject) => {
        if (!dir || typeof dir !== "string") {
            return reject("Incorrect path to file");
        }
        fs.stat(dir, (err, stat) => {
            if (err) {
                if (err.code === "ENOENT") {
                    return resolve(false);
                }
                return reject(err);
            }
            return resolve(stat);
        })
    });
};

module.exports.upload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(403).json({message: "Forbidden."});
        }
        let file = await renameFile(req.file.path, req.file.originalname);
        let material = new Material({
            uid: req.user._id,
            test: req.test._id,
            path: file,
            title: path.basename(file)
        });
        material = await material.save();
        return res.status(200).json({file: material.title});
    } catch (err) {
        console.log("[material.controller] error", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.download = async (req, res) => {
    try {
        let material = await Material.findById(req.params.materialId);

        if (!material) {
            return res.status(404).json({message: "Material not found."});
        }
        if (!await exists(material.path)) {
            return res.status(404).json({message: "Material file not found."})
        }

        let mimetype = mime.getType(material.path);

        res.attachment(material.title);
        res.set('Content-disposition', 'attachment; filename=' + material.title);
        res.set('Content-type', mimetype);

        let filestream = fs.createReadStream(material.path);
        filestream.pipe(res);
    } catch (err) {
        console.log("[material.controller] error", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports.get = async (req, res) => {
    try {
        let find = {};
        if (req.query.search) {
            find.title = new RegExp(req.query.search);
        }
        let materials = await Material.find(find).sort({uploadAt: -1});
        if (!materials) {
            return res.status(404).json({message: "Materials not found."});
        }
        return res.status(200).json({materials});
    } catch(err) {
        console.log("[material.controller] error", err);
        res.status(500).json({ error: "Internal server error." });
    }
};