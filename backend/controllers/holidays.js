const { validationResult, matchedData } = require("express-validator");
const logger = require("../config/logger.js");
const Holiday = require("../models/Holidays.js");
const Holidays = require("../models/Holidays.js");

//@desc Test Holiday API
//@route GET /api/v1/holiday
//@access Private: Needs Login
const testHolidayAPI = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (user) {
    logger.info(
      `${ip}: API /api/v1/role | User: ${user.name} | responnded with Role Api Successful `
    );
    return res
      .status(200)
      .send({ data: user, message: "Holiday Api Successful" });
  } else {
    logger.error(
      `${ip}: API /api/v1/role | User: ${user.name} | responnded with User is not Autherized `
    );
    return res.status(401).send({ message: "User is not Autherized" });
  }
};

//@desc Add Holiday API
//@route POST /api/v1/holiday/add
//@access Private: Needs Login
const addHoliday = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (user) {
    const data = matchedData(req);

    const oldHoliday = await Holidays.findOne({
      holidayDate: data.holidayDate,
      client_id: user._id,
    });
    if (oldHoliday) {
      logger.error(
        `${ip}: API /api/v1/holiday/add | User: ${user.name} | responnded with Holiday already Exists! for Holiday: ${data.holidayDate} `
      );
      return res.status(200).json({ message: "Holiday already Exists!" });
    }
    await Holidays.create({
      name: data.name,
      holidayDate: data.holidayDate,
      client_id: user._id,
    })
      .then((holiday) => {
        logger.info(
          `${ip}: API /api/v1/holiday/add | User: ${user.name} | responnded with Success `
        );
        return res.status(201).json(holiday);
      })
      .catch((err) => {
        logger.error(
          `${ip}: API /api/v1/holiday/add | User: ${user.name} | responnded with Error `
        );
        return res.status(500).json({ error: "Error", message: err.message });
      });
  } else {
    logger.error(
      `${ip}: API /api/v1/role | User: ${user.name} | responnded with User is not Autherized `
    );
    return res.status(401).send({ message: "User is not Autherized" });
  }
};

//@desc Get all Holidays
//@route GET /api/v1/holiday/getall
//@access private: Needs Login
const getHolidays = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user = req.user;

  try {
    if (user) {
      const holidays = await Holidays.find({
        active: true,
      });
      logger.info(
        `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with Success `
      );
      return await res.status(200).json({
        data: holidays,
        message: "Holidays retrived successfully",
      });
    } else {
      logger.error(
        `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with User is not Autherized `
      );
      return res.status(401).send({ message: "User is not Autherized" });
    }
  } catch (error) {
    logger.error(
      `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with Error `
    );
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//@desc Get all Client Holidays
//@route GET /api/v1/holiday/getall/cient/:id
//@access private: Needs Login
const getHolidaysClient = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user = req.user;
  const { id } = req.params;

  try {
    if (user) {
      const holidays = await Holidays.find({
        active: true,
        client_id: id,
      });
      logger.info(
        `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with Success `
      );
      return await res.status(200).json({
        data: holidays,
        message: "Holidays retrived successfully",
      });
    } else {
      logger.error(
        `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with User is not Autherized `
      );
      return res.status(401).send({ message: "User is not Autherized" });
    }
  } catch (error) {
    logger.error(
      `${ip}: API /api/v1/holiday/getall | User: ${user.name} | responnded with Error `
    );
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//@desc Delete Holiday with id (we are updating active to false )
//@route PUT /api/v1/holiday/delete/:id
//@access private: Needs Login
const deleteHoliday = async (req, res) => {
  const { id } = req.params;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const user = req.user;

  try {
    if (user) {
      const updatedHoliday = {
        active: false,
      };
      const oldHoliday = await Holidays.findOne({ _id: id });
      if (oldHoliday) {
        const result = await Holidays.findByIdAndUpdate(id, updatedHoliday, {
          new: true,
        });
        logger.info(
          `${ip}: API /api/v1/holiday/delete/:${id} | User: ${user.name} | responnded with Success `
        );
        return res
          .status(200)
          .json({ data: result, message: "Holiday Deleted Successfully" });
      } else {
        logger.info(
          `${ip}: API /api/v1/holiday/delete/:${id} | User: ${user.name} | responnded with Holiday Not Found `
        );
        return res.status(402).json({ message: "Holiday Not Found" });
      }
    } else {
      logger.error(
        `${ip}: API /api/v1/holiday/delete/:${id} | User: ${user.name} | responnded with User is not Autherized `
      );
      return res.status(401).send({ message: "User is not Autherized" });
    }
  } catch (error) {
    logger.error(
      `${ip}: API /api/v1/holiday/delete/:${id} | User: ${user.name} | responnded with Error `
    );
    return res
      .status(500)
      .json({ data: error, message: "Something went wrong" });
  }
};

module.exports = {
  testHolidayAPI,
  addHoliday,
  getHolidays,
  getHolidaysClient,
  deleteHoliday,
};
