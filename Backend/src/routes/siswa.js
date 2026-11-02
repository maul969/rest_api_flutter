const express = require('express');
const router = express.Router();

const siswaController = require('../controllers/siswa_controller');
const auth = require('../middleware/auth');

router.get('/siswa', auth, siswaController.findAll);
router.post('/siswa', auth, siswaController.create);
router.put('/siswa/:id', auth, siswaController.update);
router.delete('/siswa/:id', auth, siswaController.delete);

module.exports = router;
