import express from 'express';
import { Menu } from '../database/db';
import { authmiddleware } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/menu' ,authmiddleware, async (req : any , res : any) => {
    try{
        const menu = await Menu.find({});
        return res.status(200).json(menu);
    }catch(error){
        return res.status(400).json({error : 'Error in fetching menu'});
    }
})

router.get('/menu/:id' ,authmiddleware, async (req : any , res : any) => {
    try{
        const menu = await Menu.findById(req.params.id);
        if(!menu){
            return res.status(404).json({error : 'Menu item not found'});
        }
        return res.status(200).json(menu);
    }catch(error){
        return res.status(400).json({error : 'Error in fetching menu'});
    }
})

router.post('/menu' ,authmiddleware, async (req : any , res : any) => {
    try{
        const {name , category , price , availablity , imageUrl , description} = req.body;
        const newMenu = new Menu({
            name,
            category,
            price,
            availablity,
            imageUrl,
            description

        });
        await newMenu.save();
        return res.status(200).json(newMenu);
    }catch(error){
        return res.status(400).json({error : 'Error in adding menu'});
    }
})


router.put('/menu/:id',authmiddleware, async (req : any, res : any) => {
    try {
        const { name, category, price, availability, imageUrl } = req.body;
        const menu = await Menu.findOneAndUpdate(
            { _id: req.params.id },
            {
                name,
                category,
                price,
                availability,
                imageUrl
            },
         
        );
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        const finalmenu = await Menu.findById(req.params.id);
       

        return res.status(200).json(finalmenu);
    } catch (error: any) {
        return res.status(400).json({ error: 'Error in updating menu' });
    }
});


router.delete('/menu/:id',authmiddleware, async (req : any, res : any) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        return res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error: any) {
        return res.status(400).json({ error: 'Error in deleting menu' });
    }
});

export default router;