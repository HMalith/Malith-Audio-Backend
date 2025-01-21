import Product from "../models/productModel.js";


export function addProduct(req,res){
    console.log(req.user);

    if(req.user==null){
        res.status(401).json({
            message:"Please login and try again"
        })
        return;
    }

    if(req.user.role!="admin"){
        res.status(403).json({
            message:"Access denied"
        })
        return;
    }
    
    const data=req.body;
    const newProduct=Product(data)
    newProduct.save().then(
        ()=>{
            res.json({
                message:"Product added succesfully"
            })
        }
    ).catch((error)=>{
        res.status(500).json({error:"Error in adding the product"})

    })
}