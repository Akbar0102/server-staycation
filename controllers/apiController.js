const Item = require('../models/Item');
const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const Category = require('../models/Category');

module.exports = {
    landingPage: async (req, res) => {
        try {
            const mostPicked = await Item.find()
                .select('_id title country city price unit')
                .limit(5)
                .populate({path: 'imageId', select: '_id imageUrl'});

            const category = await Category.find()
                .select('_id nama')
                .limit(3)
                .populate({
                    path: 'itemId', 
                    select: '_id title country city isPopular',
                    perDocumentLimit: 4,
                    options: {sort: {sumBooking: 'desc'}},
                    populate: {
                        path: 'imageId',
                        select: '_id imageUrl',
                        perDocumentLimit: 1
                    }
                });

            const traveler = await Booking.find();
            const treasure = await Activity.find();
            const city = await Item.find().select('city');

            for(let i=0; i<category.length; i++){
                for(let j=0; j<category[i].itemId.length; j++){
                    const item = await Item.findOne({_id: category[i].itemId[j]._id});
                    item.isPopular = false;
                    await item.save();
                    if(category[i].itemId[0] === category[i].itemId[j]){
                        item.isPopular = true;
                        await item.save();
                    }
                }
            }
                
            res.status(200).json({
                hero:{
                    travelers: traveler.length,
                    treasures: treasure.length,
                    cities: city.length
                },
                mostPicked,
                category
            });
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }
}