import { Router } from "express";
import ProductManager from "../productManager.js";

const productsRouter = Router();
const PM = new ProductManager();
const products = PM.getProducts();

productsRouter.get("/", (req, res) => {
    const products = PM.getProducts();
    let { limit } = req.query;

    res.send({ products: limit ? products.slice(0, limit) : products });
});

productsRouter.get("/:pid", (req, res) => {
    const products = PM.getProducts();
    let pid = parseInt(req.params.pid);

    res.send({ products: products.find(item => item.id === pid) || "Error! ID inexistente!!" })
});
productsRouter.post("/", (req, res) => {
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Title!" });
        return false;
    }
    if (!description) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Description!" });
        return false;
    }
    if (!code) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Code!" });
        return false;
    }
    if (!price) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Price!" });
        return false;
    }
    if (!status) {
        status = true;
    }
    if (!stock) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Stock!" });
        return false;
    }
    if (!category) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Category!" });
        return false;
    }
    if (!thumbnails) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Thumbnails!" });
        return false;
    } else if ((!Array.isArray(thumbnails)) || thumbnails.length == 0) {
        res.status(400).send({ status: "error", message: "Debe cargar una imagen en el array Thumbnails!" });
        return false;
    }

    if (PM.addProduct({ title, description, code, price, status, stock, category, thumbnails })) {
        res.send({ status: "OK", message: "El producto se ha cargado exitosamente!" })
    } else {
        res.status(500).send({ status: "error", message: "Error al cargar el producto!" })
    }
})

productsRouter.put("/:pid", (req, res) => {
    let pid = Number(req.params.pid);
    let { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Title!" });
        return false;
    }
    if (!description) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Description!" });
        return false;
    }
    if (!code) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Code!" });
        return false;
    }
    if (!price) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Price!" });
        return false;
    }
    if (!status) {
        status = true;
    }
    if (!stock) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Stock!" });
        return false;
    }
    if (!category) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Category!" });
        return false;
    }
    if (!thumbnails) {
        res.status(400).send({ status: "error", message: "Debe completar el campo Thumbnails!" });
        return false;
    } else if ((!Array.isArray(thumbnails)) || thumbnails.length == 0) {
        res.status(400).send({ status: "error", message: "Debe cargar una imagen en el array Thumbnails!" });
        return false;
    }

    if (PM.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails })) {
        res.send({ status: "OK", message: "El producto se actualizó correctamente!" })
    } else {
        res.status(500).send({ status: "error", message: "Error al actualizar el producto!" })
    }
})

productsRouter.delete("/:pid", (req, res) => {
    let pid = Number(req.params.pid);

    if (PM.deleteProduct(pid)) {
        res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
    }
})

export default productsRouter;