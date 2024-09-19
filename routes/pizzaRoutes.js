import Express from 'express';
import pizzaModel from '../model/pizzaModel.js';
const router = Express.Router();

//GET all pizza || @Get REQUEST
router.get('/getAllPizzas',async(req,res)=>{
    try{
        const pizzas = await pizzaModel.find({})
        res.send(pizzas)
    }
    catch(error){
        res.json({message:error});
    }
})

//ADD new Pizza
router.post('/addpizza',async(req,res)=>{
    const {pizza} = req.body;
    try{
        const newPizza = new pizzaModel({
            name: pizza.name,
            image: pizza.image,
            variants: ['regular','medium','large'],
            description: pizza.description,
            category: pizza.category,
            prices: [pizza.prices]
        })
        await newPizza.save()
        res.status(201).send('New Pizza Added')
        
    }
    catch(error){
        res.json({message:error});
    }
})

//update pizza by id
router.post('/getpizzabyid',async(req,res)=>{
    const pizzaid = req.body.pizzaId;
    try{
        const pizza = await pizzaModel.findOne({_id:pizzaid})
        res.send(pizza)
    }
    catch(error){
        res.json({message:error});
    }
})

router.post('/updatepizza', async(req,res) =>{
    const updatedPizza = req.body.updatedPizza;
    try{
        const pizza = await pizzaModel.findOne({_id:updatedPizza._id})
        pizza.name = updatedPizza.name
        pizza.description = updatedPizza.description
        pizza.category = updatedPizza.category
        pizza.prices = [updatedPizza.prices]
        pizza.image = updatedPizza.image
        await pizza.save()
        res.status(200).send("Pizza Update Successful")
    }
    catch(err){
        res.status(404).json({message : err})

    }
})

router.post('/deletepizza',async(req,res)=>{
    const {pizzaId} = req.body;
    try{
        await pizzaModel.findOneAndDelete({_id:pizzaId});
        res.status(200).send("Pizza Deleted");
    }
    catch(err){
        res.status(404).json({message: err})
    }
})


export default router;
