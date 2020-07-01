const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Image = require('../models/Image');

const fs = require('fs-extra');
const path = require('path');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: 'Staycation | Dashboard'
        });
    },

    viewCategory: async (req, res) => {
        try {
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/category/view_category', {category, 
                alert,
                title: 'Staycation | Category'
            });
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/category');
        }
    },
    addCategory: async (req, res) => {
        try {
            const {nama} = req.body;
            await Category.create({nama});
            req.flash('alertMessage', 'Success Add Category');
            req.flash('alertStatus', 'success'); 
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/category');
        }
    },
    editCategory: async (req, res) => {
        try {
            const {id, nama} = req.body;
            const category = await Category.findOne({_id: id});
            category.nama = nama;
            await category.save();
            req.flash('alertMessage', 'Success Update Category');
            req.flash('alertStatus', 'success'); 
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/category');
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const {id} = req.params;
            const category = await Category.findOne({_id: id});
            await category.remove();
            req.flash('alertMessage', 'Success Delete Category');
            req.flash('alertStatus', 'success'); 
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/category');
        }
    },

    viewBank: async (req, res) => {
        try {
            const bank = await Bank.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/bank/view_bank', {
                title: 'Staycation | Bank',
                alert,
                bank
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/bank');
        }
    },
    addBank: async (req, res) => {
        try {
            const {nama, namaBank, nomorRekening} = req.body;
            await Bank.create({
                nama,
                namaBank,
                nomorRekening,
                imageUrl: `images/${req.file.filename}`
            });
            req.flash('alertMessage', 'Success Add Bank');
            req.flash('alertStatus', 'success'); 
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/bank');
        }
    },
    editBank: async (req, res) => {
        try {
            const {id, nama, namaBank, nomorRekening} = req.body;
            const bank = await Bank.findOne({_id: id});
            if(req.file == undefined){
                bank.nama = nama;
                bank.namaBank = namaBank;
                bank.nomorRekening = nomorRekening;
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success'); 
                res.redirect('/admin/bank');
            }else{
                fs.unlink(path.join(`public/${bank.imageUrl}`));
                bank.nama = nama;
                bank.namaBank = namaBank;
                bank.nomorRekening = nomorRekening;
                bank.imageUrl = `images/${req.file.filename}`;
                await bank.save();
                req.flash('alertMessage', 'Success Update Bank');
                req.flash('alertStatus', 'success'); 
                res.redirect('/admin/bank');
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/bank');
        }
    },
    deleteBank: async (req, res) => {
        try {
            const {id} = req.params;
            const bank = await Bank.findOne({_id: id});
            await fs.unlink(path.join(`public/${bank.imageUrl}`));
            await bank.remove();
            req.flash('alertMessage', 'Success Delete Bank');
            req.flash('alertStatus', 'success'); 
            res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/bank');
        }
    },

    viewItem: async (req, res) => {
        try {
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status: alertStatus};
            res.render('admin/item/view_item', {
                title: 'Staycation | Item',
                category,
                alert
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/item');
        }
    },
    addItem: async (req, res) => {
        try {
            const {categoryId, title, price, city, about} = req.body;
            if(req.files.length > 0){
                const category = await Category.findOne({_id: categoryId});
                const newItem = {
                    categoryId: category._id,
                    title,
                    description: about,
                    price,
                    city
                }
                const item = await Item.create(newItem);
                category.itemId.push({_id: item._id});
                await category.save();

                for(let i=0; i<req.files.length; i++){
                    const imageSave = await Image.create({imageUrl: `images/${req.files[i].filename}`});
                    item.imageId.push({_id: imageSave._id});
                    await item.save();
                }
                req.flash('alertMessage', 'Success Add Item');
                req.flash('alertStatus', 'success'); 
                res.redirect('/admin/item');
            }

        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger'); 
            res.redirect('/admin/item');
        }
    },

    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: 'Staycation | Booking'
        });
    }
}