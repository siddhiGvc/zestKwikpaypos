import { Machine, AddressData } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
const { Op } = require("sequelize");

export const allMachines = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const obj = await Machine.findAndCountAll({
      order: [['createdAt', 'DESC'], ['id', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { obj });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const get = async (req, res) => {
  try {
    const obj = await Machine.findAll();
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const getAddressData = async (req, res) => {
  let whereObj = {
    mapped_serial: null
  };
  if (req.query.term) whereObj.uid = {
    [Op.like]: '%' + req.query.term + '%'
  }
  try {
    const obj = await AddressData.findAll({
      where: whereObj
    });
    return successResponse(req, res, obj);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}

export const createMapping = async (req, res) => {
  if (!req.body.machine) return errorResponse(req, res, "Machine No. is required");
  if (!req.body.uid) return errorResponse(req, res, "UID is required");
  if (!req.body.city) return errorResponse(req, res, "City is required");
  if (!req.body.installedOn) return errorResponse(req, res, "Installed On Date is required");
  var machine = await Machine.findOne({ where: { serial: req.body.machine } });
  if (machine === null) return errorResponse(req, res, "Machine Not Found");
  var address = await AddressData.findOne({ where: { uid: req.body.uid } });
  if (address === null) return errorResponse(req, res, "Address Info Not Found");
  var machine_new = {
    uid: address.uid,
    zone: address.zone,
    ward: address.ward,
    beat: address.beat,
    address: address.address,
    lat: address.lat,
    lon: address.lon,
    data1: req.body.city,
    data2: address.owner,
    data3: address.agency,
    data4: address.electric,
    data5: address.num_seat,
    data6: address.seat_male,
    data7: address.seat_female,
    data9: req.body.installedOn,
  };
  Machine.update(machine_new, { where: { serial: req.body.machine } });
  AddressData.update({mapped_serial: req.body.machine}, { where: { uid: req.body.uid } });
  return successResponse(req, res, { status: true });
}