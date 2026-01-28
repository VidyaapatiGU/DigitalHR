const { validationResult, matchedData } = require("express-validator");
const logger = require("../config/logger.js");
const Settings = require("../models/Settings.js");
const Employee = require("../models/Employee");
const Leaves = require("../models/Leaves");
const Client = require("../models/Client");
var axios = require("axios");
var request = require("request");

let verificationId_global = "";

//@desc Test Settings API
//@route GET /api/v1/settings
//@access Private: Needs Login
const testSettingsAPI = async (req, res) => {
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

//@desc Add Settings Holiday to, from
//@route POST /api/v1/settings/holiday/to_from
//@access Private: Needs Login
const addHolidayToFrom = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (user) {
    const data = matchedData(req);

    const oldHolidayCombination = await Settings.findOne({
      holidayToDate: { $not: { $exists: true } },
      holidayFromDate: { $not: { $exists: true } },
      client_id: user._id,
    });
    if (oldHolidayCombination) {
      updateHolidayToFromData = {
        holidayToDate: data.holidayDateTo,
        holidayFromDate: data.holidayDateFrom,
      };
      const id = oldHolidayCombination._id;
      const result = await Settings.findByIdAndUpdate(
        id,
        updateHolidayToFromData,
        {
          new: true,
        }
      );
      if (result) {
        logger.error(
          `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Holiday To From already Exists! for Holiday: ${data.holidayDate} `
        );
        return res.status(201).json({ holiday: result });
      }
    } else {
      await Settings.create({
        holidayToDate: data.holidayDateTo,
        holidayFromDate: data.holidayDateFrom,
        client_id: user._id,
      })
        .then((holiday) => {
          logger.info(
            `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Success `
          );
          return res.status(201).json(holiday);
        })
        .catch((err) => {
          logger.error(
            `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Error `
          );
          return res.status(500).json({ error: "Error", message: err.message });
        });
    }
  } else {
    logger.error(
      `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with User is not Autherized `
    );
    return res.status(401).send({ message: "User is not Autherized" });
  }
};

//@desc Get Client Settings Holiday to, from
//@route GET /api/v1/settings/holiday/to_from/:id
//@access private: Needs Login
const getHolidaysPolicy = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user = req.user;
  const { id } = req.params;

  try {
    if (user) {
      // return settings documents sorted by update time so the most recently updated appears first
      const holidayPolicy = await Settings.find({
        active: true,
        client_id: id,
      }).sort({ updatedAt: -1 });
      logger.info(
        `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Success `
      );
      return await res.status(200).json({
        data: holidayPolicy,
        message: "Holiday Policy retrived successfully",
      });
    } else {
      logger.error(
        `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with User is not Autherized `
      );
      return res.status(401).send({ message: "User is not Autherized" });
    }
  } catch (error) {
    logger.error(
      `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Error `
    );
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//@desc Update Client Settings Holiday to, from
//@route PUT /api/v1/settings/holiday/to_from/update/:Clientid
//@access Private:Needs Login
const updateHolidayToFrom = async (req, res) => {
  const { Clientid } = req.params;
  const { holidayToDate, holidayFromDate } = req.body;

  console.log(Clientid, holidayToDate, holidayFromDate);

  const user = req.user;

  const errors = validationResult(req);
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!errors.isEmpty()) {
    logger.error(
      `${ip}: API /api/v1/settings/holiday/to_from/update | User: ${user.name} | responnded with Validation Error `
    );
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (user) {
      const updatedHolidayPolicy = {
        holidayToDate,
        holidayFromDate,
        client_id: Clientid,
      };

      const oldHolidayPloicy = await Settings.findOne({
        client_id: Clientid,
      });
      if (oldHolidayPloicy) {
        const id = oldHolidayPloicy._id;
        const result = await Settings.findByIdAndUpdate(
          id,
          updatedHolidayPolicy,
          {
            new: true,
          }
        );
        logger.info(
          `${ip}: API /api/v1/settings/holiday/to_from/update | User: ${user.name} | responnded with Success `
        );
        return res.status(200).json({
          data: result,
          message: "Holiday Policy Updated Successfully",
        });
      } else {
        logger.info(
          `${ip}: API /api/v1/settings/holiday/to_from/update | User: ${user.name} | responnded with Role Not Found `
        );
        return res.status(201).json({ message: "Holiday Policy Not Found" });
      }
    } else {
      logger.error(
        `${ip}: API /api/v1/settings/holiday/to_from/update | User: ${user.name} | responnded with User is not Autherized `
      );
      return res.status(401).send({ message: "User is not Autherized" });
    }
  } catch (error) {
    logger.error(
      `${ip}: API /api/v1/settings/holiday/to_from/update | User: ${user.name} | responnded with Error `
    );
    console.log(error);
    return res
      .status(500)
      .json({ data: error, message: "Something went wrong" });
  }
};

//@desc Update Client Settings weekly off and update all employee weeklyOff values
//@route PUT /api/v1/settings/weekly_off/update/:Clientid
//@access Private: Needs Login
const updateWeeklyOff = async (req, res) => {
  const { Clientid } = req.params;
  const { weeklyOff } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Validate the request body
  if (!weeklyOff || !Array.isArray(weeklyOff) || weeklyOff.length === 0) {
    logger.info(`${ip}: Weekly off update request failed validation - weeklyOff is missing or empty for client_id ${Clientid}`);
    return res.status(400).json({ message: "Weekly Off days are required and must be a non-empty array." });
  }

  try {
    // Log the incoming update request details
    logger.info(`${ip}: Received request to update weeklyOff for client_id ${Clientid} with data: ${JSON.stringify(weeklyOff)}`);
    
    const updatedData = { weeklyOff, client_id: Clientid };

    // Update settings for this client
    let settingsResult;
    const existingSetting = await Settings.findOne({ client_id: Clientid });
    if (existingSetting) {
      logger.info(`${ip}: Found existing settings for client_id ${Clientid}. Updating settings.`);
      settingsResult = await Settings.findByIdAndUpdate(existingSetting._id, updatedData, { new: true });
      if (!settingsResult) {
        logger.error(`${ip}: Error updating weekly off in settings for client_id ${Clientid}`);
        return res.status(500).json({ message: "Error updating weekly off in settings" });
      }
      logger.info(`${ip}: Successfully updated settings for client_id ${Clientid}`);
    } else {
      logger.info(`${ip}: No existing settings found for client_id ${Clientid}. Creating new settings.`);
      settingsResult = await Settings.create({ ...updatedData, client_id: Clientid });
      logger.info(`${ip}: Successfully created new settings for client_id ${Clientid}`);
    }

    // Update weeklyOff for all employees with the same client_id
    logger.info(`${ip}: Updating all employee records for client_id ${Clientid} with weeklyOff: ${JSON.stringify(weeklyOff)}`);
    const employeeResult = await Employee.updateMany(
      { client_id: Clientid },
      { $set: { weeklyOff: weeklyOff } },
      { upsert: false }
    );
    logger.info(`${ip}: Updated ${employeeResult.modifiedCount || employeeResult.nModified} employee record(s) for client_id ${Clientid}`);

    return res.status(200).json({
      settings: settingsResult,
      employeeUpdate: employeeResult,
      message: "Weekly Off updated successfully for settings and all employees"
    });
  } catch (error) {
    console.error("Error updating weekly off:", error);
    logger.error(`${ip}: API /api/v1/settings/weekly_off/update | User: ${user.name} | Error: ${error.message}`);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

//@desc Get Weekly Off from Settings
//@route GET /api/v1/settings/weekly_off/:Clientid
//@access Private: Needs Login
const getWeeklyOff = async (req, res) => {
  const { _id } = req.params;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to get weekly off settings.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    const settings = await Settings.findOne({ client_id: _id });
    logger.info(`${settings}`);
    
    if (!settings || !settings.weeklyOff) {
      logger.info(`${ip}: No weekly off settings found for client_id ${_id}`);
      return res.status(404).json({ message: "Weekly Off settings not found" });
    }

    logger.info(`${ip}: Retrieved weekly off settings for client_id ${_id}`);
    return res.status(200).json({ weeklyOff: settings.weeklyOff });

  } catch (error) {
    logger.error(`${ip}: Error fetching weekly off settings: ${error.message}`);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const sendOtp = async (req, res) => {
  const { countryCode, mobileNumber } = req.body;
  const customerId = process.env.MsgCustomerId;
  const AuthToken = process.env.AuthTokenMSG;

  //console.log(countryCode, mobileNumber, customerId, AuthToken);

  var options = {
    method: "POST",
    url:
      "https://cpaas.messagecentral.com/verification/v3/send?countryCode=" +
      countryCode +
      "&customerId=" +
      customerId +
      "&flowType=SMS&mobileNumber=" +
      mobileNumber,
    headers: {
      authToken: AuthToken,
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const resObject = JSON.parse(response.body);
    if (resObject.responseCode == 200) {
      return res.status(200).json({
        data: {
          responseCode: resObject.responseCode,
          message: resObject.message,
          verificationId: resObject.data.verificationId,
          mobileNumber: resObject.data.mobileNumber,
          transactionId: resObject.data.transactionId,
        },
        message: "OTP Sent",
      });
    }
  });
};

const validateOtp = async (req, res) => {
  const { countryCode, mobileNumber, verificationId, code } = req.body;
  const customerId = process.env.MsgCustomerId;
  const AuthToken = process.env.AuthTokenMSG;

  //console.log(countryCode, mobileNumber, customerId, AuthToken, verificationId, code);
  var options = {
    method: "GET",
    url:
      "https://cpaas.messagecentral.com/verification/v3/validateOtp?countryCode=" +
      countryCode +
      "&mobileNumber=" +
      mobileNumber +
      "&verificationId=" +
      verificationId +
      "&customerId=" +
      customerId +
      "&code=" +
      code,
    headers: {
      authToken: AuthToken,
    },
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    const resObject = JSON.parse(response.body);
    if (resObject.responseCode == 200) {
      return res.status(200).json({
        data: {
          responseCode: resObject.data.responseCode,
          message: resObject.message,
          verificationId: resObject.data.verificationId,
          verificationStatus: resObject.data.verificationStatus,
          mobileNumber: resObject.data.mobileNumber,
          transactionId: resObject.data.transactionId,
          errorMessage: resObject.data.errorMessage,
        },
        message: "OTP Validated",
      });
    }
  });
};

//@desc Add Settings Salary Logic
//@route POST /api/v1/settings/salary/logic
//@access Private: Needs Login
const _addSalaryLogic = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (user) {
    const data = matchedData(req);

    const oldSalaryLogic = await Settings.findOne({
      salary_logic: { $exists: true },
      client_id: user._id,
    });
    if (oldSalaryLogic) {
      console.log("In Update salary Logic");
      updateSalaryLogicData = {
        salary_logic: data.salary_logic,
      };
      const id = oldSalaryLogic._id;
      const result = await Settings.findByIdAndUpdate(
        id,
        updateSalaryLogicData,
        {
          new: true,
        }
      )
        .then((setting) => {
          logger.info(
            `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responnded with Success `
          );
          return res.status(200).json({
            data: setting,
            message: "Salary Logic Updated Successfully!",
          });
        })
        .catch((err) => {
          logger.error(
            `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responnded with Error `
          );
          return res.status(500).json({ error: "Error", message: err.message });
        });
    }

    const oldClientSetting = await Settings.findOne({
      client_id: user._id,
      active: true,
    });
    if (oldClientSetting) {
      console.log("In update existing client salary Logic");
      addSalaryLogicData = {
        salary_logic: data.salary_logic,
      };
      const id = oldClientSetting._id;
      const result = await Settings.findByIdAndUpdate(id, addSalaryLogicData, {
        new: true,
      });
      if (!result) {
        logger.error(
          `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Not Found`
        );
        return res.status(500).json({
          error: "Not Found",
          message: "Something Went Wrong!",
        });
      }
      logger.info(
        `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Success`
      );
      return res.status(200).json({
        data: result,
        message: "Salary Logic Added Successfully!",
      });
    } else {
      console.log("In Add salary Logic");
      await Settings.create({
        salary_logic: data.salary_logic,
        client_id: user._id,
      })
        .then((settings) => {
          logger.info(
            `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responnded with Success `
          );
          return res.status(200).json({
            data: setting,
            message: "Salary Logic Added Successfully!",
          });
        })
        .catch((err) => {
          logger.error(
            `${ip}: API /api/v1/settings/holiday/to_from | User: ${user.name} | responnded with Error `
          );
          return res.status(500).json({ error: "Error", message: err.message });
        });
    }
  } else {
    logger.error(
      `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responnded with User is not Autherized `
    );
    return res.status(401).send({ message: "User is not Autherized" });
  }
};

const addSalaryLogic = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!user) {
    logger.error(
      `${ip}: API /api/v1/settings/salary/logic | User: Unknown | responded with Unauthorized`
    );
    return res.status(401).json({ message: "User is not Authorized" });
  }

  try {
    const data = matchedData(req);

    // Check if salary_logic already exists for the user
    const oldSalaryLogic = await Settings.findOne({
      salary_logic: { $exists: true },
      client_id: user._id,
    });

    if (oldSalaryLogic) {
      console.log("In Update Salary Logic");
      const updateSalaryLogicData = { salary_logic: data.salary_logic };
      const updatedSetting = await Settings.findByIdAndUpdate(
        oldSalaryLogic._id,
        updateSalaryLogicData,
        { new: true }
      );

      if (updatedSetting) {
        logger.info(
          `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Success`
        );
        return res.status(200).json({
          data: updatedSetting,
          message: "Salary Logic Updated Successfully!",
        });
      }
    }

    // Check for existing active client setting
    const oldClientSetting = await Settings.findOne({
      client_id: user._id,
      active: true,
    });

    if (oldClientSetting) {
      console.log("In Update Existing Client Salary Logic");
      const addSalaryLogicData = { salary_logic: data.salary_logic };
      const updatedSetting = await Settings.findByIdAndUpdate(
        oldClientSetting._id,
        addSalaryLogicData,
        { new: true }
      );

      if (updatedSetting) {
        logger.info(
          `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Success`
        );
        return res.status(200).json({
          data: updatedSetting,
          message: "Salary Logic Added Successfully!",
        });
      }
    }

    // If no existing logic, create a new one
    console.log("In Add Salary Logic");
    const newSetting = await Settings.create({
      salary_logic: data.salary_logic,
      client_id: user._id,
    });

    logger.info(
      `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Success`
    );

    return res.status(200).json({
      data: newSetting,
      message: "Salary Logic Added Successfully!",
    });
  } catch (err) {
    logger.error(
      `${ip}: API /api/v1/settings/salary/logic | User: ${user.name} | responded with Error`
    );
    return res.status(500).json({
      error: "Error",
      message: err.message,
    });
  }
};

//@desc Add Settings Salary structure
//@route POST /api/v1/settings/salary/struct
//@access Private: Needs Login
const addSalaryStructure = async (req, res) => {
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  if (!user) {
    logger.error(
      `${ip}: API /api/v1/settings/salary/logic | User: Unknown | responded with Unauthorized`
    );
    return res.status(401).json({ message: "User is not Authorized" });
  }

  try {
    const data = matchedData(req);

    // Check if salary_structure already exists for the user
    const oldSalaryStructure = await Settings.findOne({
      salary_structure: { $exists: true },
      client_id: user._id,
    });

    if (oldSalaryStructure) {
      console.log("In Update Salary Structure");
      const updateSalaryStructData = {
        salary_structure: data.salary_structure,
      };
      const updatedSetting = await Settings.findByIdAndUpdate(
        oldSalaryStructure._id,
        updateSalaryStructData,
        { new: true }
      );

      if (updatedSetting) {
        logger.info(
          `${ip}: API /api/v1/settings/salary/struct | User: ${user.name} | responded with Success`
        );
        return res.status(200).json({
          data: updatedSetting,
          message: "Salary Structure Updated Successfully!",
        });
      }
    }

    // Check for existing active client setting
    const oldClientSetting = await Settings.findOne({
      client_id: user._id,
      active: true,
    });

    if (oldClientSetting) {
      console.log("In Update Existing Client Salary Structure");
      const addSalaryStructData = { salary_structure: data.salary_structure };
      const updatedSetting = await Settings.findByIdAndUpdate(
        oldClientSetting._id,
        addSalaryStructData,
        { new: true }
      );

      if (updatedSetting) {
        logger.info(
          `${ip}: API /api/v1/settings/salary/struct | User: ${user.name} | responded with Success`
        );
        return res.status(200).json({
          data: updatedSetting,
          message: "Salary Structure Added Successfully!",
        });
      }
    }

    // If no existing logic, create a new one
    console.log("In Add Salary struct");
    const newSetting = await Settings.create({
      salary_structure: data.salary_structure,
      client_id: user._id,
    });

    logger.info(
      `${ip}: API /api/v1/settings/salary/struct | User: ${user.name} | responded with Success`
    );

    return res.status(200).json({
      data: newSetting,
      message: "Salary Structure Added Successfully!",
    });
  } catch (err) {
    logger.error(
      `${ip}: API /api/v1/settings/salary/struct | User: ${user.name} | responded with Error`
    );
    return res.status(500).json({
      error: "Error",
      message: err.message,
    });
  }
};

//@desc Test Leaves API
//@route GET /api/v1/leaves
//@access Private: Needs Login
const testLeavesAPI = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user = req.user;

  if (user) {
    logger.info(
      `${ip}: API /api/v1/settings | User: ${user.name} | Leaves API Test Successfully`
    );
    return res.status(200).send("Leaves API Test Successfully");
  } else {
    logger.error(
      `${ip}: API /api/v1/settings | User: unauthorized access attempted`
    );
    return res.status(401).json({ message: "User is not authorized" });
  }
};

//@desc Add Leaves API and update employee collection
//@route GET /api/v1/leaves/add/client
//@access Private: Needs Login
const addLeaves = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const user = req.user;

  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      logger.error(
          `${ip}: API /api/v1/settings/add | User: ${user.name} | Validation errors: ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({ errors: errors.array() });
  }

  const { client_id, leaves } = req.body;

  try {
      let record;
      // Check if a record already exists for the given client_id
      const existingRecord = await Leaves.findOne({ client_id });

      if (existingRecord) {
          // Update the existing record
          existingRecord.leaves.cl = Array.isArray(leaves.cl) ? leaves.cl : existingRecord.leaves.cl;
          existingRecord.leaves.sl = Array.isArray(leaves.sl) ? leaves.sl : existingRecord.leaves.sl;
          existingRecord.leaves.pl = Array.isArray(leaves.pl) ? leaves.pl : existingRecord.leaves.pl;
          record = await existingRecord.save();
          logger.info(
              `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Updated Leaves record for client_id: ${client_id}`
          );
      } else {
          // Create a new record
          const newLeaves = new Leaves({
              client_id,
              leaves: {
                  cl: Array.isArray(leaves.cl) ? leaves.cl : [],
                  sl: Array.isArray(leaves.sl) ? leaves.sl : [],
                  pl: Array.isArray(leaves.pl) ? leaves.pl : [],
              },
          });
          record = await newLeaves.save();
          if (!record) {
              logger.error(
                  `${ip}: API /api/v1/settings/add | User: ${user.name} | Error: Document not saved!`
              );
              return res.status(500).json({ error: "Document not saved" });
          }
          logger.info(
              `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Created new Leaves record for client_id: ${client_id}`
          );
      }

      // Update the employee collection for all employees with matching client_id
      const employeeUpdateResult = await Employee.updateMany(
        { client_id },
        { 
          $set: { 
            "leaves.cl": leaves.cl, 
            "leaves.sl": leaves.sl, 
            "leaves.pl": leaves.pl 
          } 
        }
    );
    logger.info(
        `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Updated Employee leaves for client_id: ${client_id}. Update result: ${JSON.stringify(employeeUpdateResult)}`
    );
    

      // Return 200 for an update, 201 for a new record
      return res.status(existingRecord ? 200 : 201).json(record);
  } catch (err) {
      logger.error(
          `${ip}: API /api/v1/settings/add | User: ${user.name} | Error: ${err.message}`
      );
      return res.status(500).json({ error: err.message });
  }
};

//@desc Update Salary Inspector
//@route PUT /api/v1/settings/salary_inspector/update/:Clientid
//@access Private: Needs Login
const updateSalaryInspector = async (req, res) => {
  const { Clientid } = req.params;
  const { salaryInspectorName, salaryOptionDate } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to update salary inspector.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    const updatedData = {
      salaryInspectorName,
      salaryOptionDate,
    };

    const existingSetting = await Settings.findOne({ client_id: Clientid });
    
    if (existingSetting) {
      const result = await Settings.findByIdAndUpdate(
        existingSetting._id,
        updatedData,
        { new: true }
      );
      
      logger.info(`${ip}: Updated salary inspector for client_id ${Clientid}`);
      return res.status(200).json({
        data: result,
        message: "Salary Inspector Updated Successfully",
      });
    } else {
      const newSetting = await Settings.create({
        ...updatedData,
        client_id: Clientid,
      });
      
      logger.info(`${ip}: Created salary inspector for client_id ${Clientid}`);
      return res.status(200).json({
        data: newSetting,
        message: "Salary Inspector Created Successfully",
      });
    }
  } catch (error) {
    logger.error(`${ip}: Error updating salary inspector: ${error.message}`);
    return res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

//@desc Update Monthly Salary Date
//@route PUT /api/v1/settings/monthly_salary_date/update/:Clientid
//@access Private: Needs Login
const updateMonthlySalaryDate = async (req, res) => {
  const { Clientid } = req.params;
  const { monthlySalaryDate } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to update monthly salary date.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    // prefer route param but fall back to authenticated user's id
    const clientIdToUse = Clientid || (user && user._id);

    if (!clientIdToUse) {
      logger.error(`${ip}: Missing client id while updating monthly salary date.`);
      return res.status(400).json({ message: 'Client id is required' });
    }

    // ensure we store a Date object (let mongoose cast as well)
    const updatedData = { monthlySalaryDate: monthlySalaryDate ? new Date(monthlySalaryDate) : null };

    const existingSetting = await Settings.findOne({ client_id: clientIdToUse });
    
    if (existingSetting) {
      const result = await Settings.findByIdAndUpdate(
        existingSetting._id,
        { $set: updatedData },
        { new: true }
      );
      
      logger.info(`${ip}: Updated monthly salary date for client_id ${Clientid}`);
      return res.status(200).json({
        data: result,
        message: "Monthly Salary Date Updated Successfully",
      });
    } else {
      const newSetting = await Settings.create({
        ...updatedData,
        client_id: clientIdToUse,
      });
      
      logger.info(`${ip}: Created monthly salary date for client_id ${clientIdToUse}`);
      return res.status(200).json({
        data: newSetting,
        message: "Monthly Salary Date Created Successfully",
      });
    }
  } catch (error) {
    logger.error(`${ip}: Error updating monthly salary date: ${error.message}`);
    return res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

// @desc Update or create working hours (Notice of Hours)
// @route PUT /api/v1/settings/working-hours/:Clientid
// @access Private: Needs Login
const updateWorkingHours = async (req, res) => {
  const { Clientid } = req.params;
  const { workingHours } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) return res.status(401).json({ message: 'User not authorized' });

    // Log incoming payload for debugging
    logger.info(`${ip}: API /api/v1/settings/working-hours | User: ${user.name} | received workingHours: ${JSON.stringify(workingHours)}`);

    // Find existing settings for client
    let setting = await Settings.findOne({ client_id: Clientid });

    if (setting) {
      // Use findByIdAndUpdate with $set to ensure nested arrays/objects are written correctly
      const updated = await Settings.findByIdAndUpdate(
        setting._id,
        { $set: { workingHours: workingHours || {} } },
        { new: true, runValidators: true }
      );
      logger.info(`${ip}: API /api/v1/settings/working-hours | User: ${user.name} | updated working hours for client ${Clientid} -> ${JSON.stringify(updated.workingHours)}`);
      return res.status(200).json({ data: updated, message: 'Working hours updated' });
    } else {
      const created = await Settings.create({ client_id: Clientid, workingHours: workingHours || {} });
      logger.info(`${ip}: API /api/v1/settings/working-hours | User: ${user.name} | created settings with working hours for client ${Clientid} -> ${JSON.stringify(created.workingHours)}`);
      return res.status(200).json({ data: created, message: 'Working hours saved' });
    }
  } catch (error) {
    logger.error(`${ip}: API /api/v1/settings/working-hours | User: ${user?.name} | Error: ${error.message}`);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const updateMinimumWages = async (req, res) => {
  const { Clientid } = req.params;
  const { minimumWages } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to update minimum wages.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    const updatedData = { minimumWages };

    const existingSetting = await Settings.findOne({ client_id: Clientid });
    
    if (existingSetting) {
      const result = await Settings.findByIdAndUpdate(
        existingSetting._id,
        updatedData,
        { new: true }
      );
      
      logger.info(`${ip}: Updated minimum wages for client_id ${Clientid}`);
      return res.status(200).json({
        data: result,
        message: "Minimum Wages Updated Successfully",
      });
    } else {
      const newSetting = await Settings.create({
        ...updatedData,
        client_id: Clientid,
      });
      
      logger.info(`${ip}: Created minimum wages for client_id ${Clientid}`);
      return res.status(200).json({
        data: newSetting,
        message: "Minimum Wages Created Successfully",
      });
    }
  } catch (error) {
    logger.error(`${ip}: Error updating minimum wages: ${error.message}`);
    return res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

//@desc Get Leaves records for a specific Client
//@route GET /api/v1/leaves/getall/client/:id
//@access Private: Needs Login
const getLeavesClient = async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const user = req.user;
    const clientId = req.query.client_id;  // Get client_id from query params
  
    if (!clientId) {
      return res.status(400).json({ error: "Client ID is required" });
    }
  
    try {
      const leavesRecords = await Leaves.find({ client_id: clientId });
  
      logger.info(
        `${ip}: API /api/v1/settings/get | User: ${user.name} | Fetched leaves records for client ${clientId}`
      );
  
      return res.status(200).json(leavesRecords);
    } catch (err) {
      logger.error(
        `${ip}: API /api/v1/settings/get | User: ${user.name} | Error: ${err.message}`
      );
      return res.status(500).json({ error: err.message });
    }
  };

//@desc Update Registration Number
//@route PUT /api/v1/settings/registration_number/update/:Clientid
//@access Private: Needs Login
const updateRegistrationNumber = async (req, res) => {
  const { Clientid } = req.params;
  const { registrationNumber } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to update registration number.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    // prefer route param but fall back to authenticated user's id
    const clientIdToUse = Clientid || (user && user._id);

    if (!clientIdToUse) {
      logger.error(`${ip}: Missing client id while updating registration number.`);
      return res.status(400).json({ message: 'Client id is required' });
    }

    const updatedData = { registrationNumber: registrationNumber || '' };

    const existingSetting = await Settings.findOne({ client_id: clientIdToUse });
    
    if (existingSetting) {
      const result = await Settings.findByIdAndUpdate(
        existingSetting._id,
        { $set: updatedData },
        { new: true }
      );
      
      logger.info(`${ip}: Updated registration number for client_id ${clientIdToUse}`);
      return res.status(200).json({
        data: result,
        message: "Registration Number Updated Successfully",
      });
    } else {
      const newSetting = await Settings.create({
        ...updatedData,
        client_id: clientIdToUse,
      });
      
      logger.info(`${ip}: Created registration number for client_id ${clientIdToUse}`);
      return res.status(200).json({
        data: newSetting,
        message: "Registration Number Created Successfully",
      });
    }
  } catch (error) {
    logger.error(`${ip}: Error updating registration number: ${error.message}`);
    return res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

//@desc Update Employee Holiday Assignments
//@route PUT /api/v1/settings/employee_holiday_assignments/update/:Clientid
//@access Private: Needs Login
const updateEmployeeHolidayAssignments = async (req, res) => {
  const { Clientid } = req.params;
  const { employeeHolidayAssignments } = req.body;
  const user = req.user;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    if (!user) {
      logger.error(`${ip}: Unauthorized access to update employee holiday assignments.`);
      return res.status(401).json({ message: "User is not Authorized" });
    }

    // prefer route param but fall back to authenticated user's id
    const clientIdToUse = Clientid || (user && user._id);

    if (!clientIdToUse) {
      logger.error(`${ip}: Missing client id while updating employee holiday assignments.`);
      return res.status(400).json({ message: 'Client id is required' });
    }

    // Validate that employeeHolidayAssignments is an array
    if (!Array.isArray(employeeHolidayAssignments)) {
      logger.error(`${ip}: Invalid employee holiday assignments format.`);
      return res.status(400).json({ message: 'Employee holiday assignments must be an array' });
    }

    // Use findOneAndUpdate with upsert so we always update the single settings document for the client_id
    const filter = { client_id: clientIdToUse };
    const update = { $set: { employeeHolidayAssignments, client_id: clientIdToUse, active: true } };
    const options = { new: true, upsert: true };

    const result = await Settings.findOneAndUpdate(filter, update, options);

    logger.info(`${ip}: Upserted employee holiday assignments for client_id ${clientIdToUse}`);
    return res.status(200).json({
      data: result,
      message: "Employee Holiday Assignments Saved Successfully",
    });
  } catch (error) {
    logger.error(`${ip}: Error updating employee holiday assignments: ${error.message}`);
    return res.status(500).json({ 
      message: "Something went wrong", 
      error: error.message 
    });
  }
};

module.exports = {
  testSettingsAPI,
  addHolidayToFrom,
  getHolidaysPolicy,
  updateHolidayToFrom,
  addSalaryLogic,
  addSalaryStructure,
  updateWeeklyOff,
  getWeeklyOff,
  sendOtp,
  validateOtp,
  testLeavesAPI,
  addLeaves,
  updateSalaryInspector,
  updateMonthlySalaryDate,
  updateRegistrationNumber,
  updateEmployeeHolidayAssignments,
  updateWorkingHours,
  updateMinimumWages,
  getLeavesClient,
};
