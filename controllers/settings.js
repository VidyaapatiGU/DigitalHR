const { validationResult, matchedData } = require("express-validator");
const logger = require("../config/logger.js");
const Settings = require("../models/Settings.js");
const Employee = require("../models/Employee");
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
          const holidayPolicy = await Settings.find({
            active: true,
            client_id: id,
          });
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
              `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Validation errors: ${JSON.stringify(errors.array())}`
          );
          return res.status(400).json({ errors: errors.array() });
      }

      const { client_id, leaves } = req.body;

      // Prepare data for the Leaves collection: only include balance values as arrays.
      const leavesForLeavesCollection = {
        cl: leaves.cl && leaves.cl.balance ? [String(leaves.cl.balance)] : [],
        sl: leaves.sl && leaves.sl.balance ? [String(leaves.sl.balance)] : [],
        pl: leaves.pl && leaves.pl.balance ? [String(leaves.pl.balance)] : [],
      };

      try {
          let record;
          // Check if a record already exists for the given client_id
          const existingRecord = await Settings.findOne({ client_id });

          if (existingRecord) {
              // Update the existing record with only balance values
              existingRecord.leaves.cl = leavesForLeavesCollection.cl;
              existingRecord.leaves.sl = leavesForLeavesCollection.sl;
              existingRecord.leaves.pl = leavesForLeavesCollection.pl;
              record = await existingRecord.save();
              logger.info(
                  `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Updated Leaves record for client_id: ${client_id}`
              );
          } else {
              // Create a new record with only balance values
              const newLeaves = new Settings({
                  client_id,
                  leaves: leavesForLeavesCollection,
              });
              record = await newLeaves.save();
              if (!record) {
                  logger.error(
                      `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Error: Document not saved!`
                  );
                  return res.status(500).json({ error: "Document not saved" });
              }
              logger.info(
                  `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Created new Leaves record for client_id: ${client_id}`
              );
          }

          // Update the Employee collection with the full leaves object (including absentDates)
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
              `${ip}: API /api/v1/leaves/add/client | User: ${user.name} | Error: ${err.message}`
          );
          return res.status(500).json({ error: err.message });
      }
    };

    //@desc Add OT Rate API and update settings collection
    //@route POST /api/v1/settings/add/otrate/:client_id
    //@access Private: Needs Login
    const addOtRate = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const user = req.user;

      // Validate incoming request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(
          `${ip}: API /api/v1/settings/add/otrate | User: ${user.name} | Validation errors: ${JSON.stringify(errors.array())}`
        );
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract ot_rate from the body and client_id from URL parameters
      const { ot_rate } = req.body;
      const client_id = req.params.client_id;

      try {
        // Update or create the settings record for the client
        let record = await Settings.findOneAndUpdate(
          { client_id }, // Search criteria
          { $set: { ot_rate } }, // Update ot_rate
          { new: true, upsert: true } // Return updated document, create if not exists
        );

        logger.info(
          `${ip}: API /api/v1/settings/add/otrate | User: ${user.name} | Updated OT rate for client_id: ${client_id} | OT Rate: ${ot_rate}`
        );

        res.status(200).json({ message: "OT rate updated successfully", record });
      } catch (err) {
        logger.error(
          `${ip}: API /api/v1/settings/add/otrate | User: ${user.name} | Error: ${err.message}`
        );
        return res.status(500).json({ error: err.message });
      }
    };
    
    //@desc Add addMinimumWage and update settings collection
    //@route POST /api/v1/settings/add/addMinimumWage/:client_id
    //@access Private: Needs Login
    const addMinimumWage = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const user = req.user;
      const client_id = req.params.client_id; // Retrieve client id from route parameter
      // Destructure the minimum wage rates from the request body
      const { unskilled, semiSkilled, skilled, clerical } = req.body;
    
      try {
        // Update the settings document with the new minimum wage rates.
        // This assumes your Settings model has a field 'minimumWageRates'.
        let record = await Settings.findOneAndUpdate(
          { client_id }, // Search criteria for the specific client
          { 
            $set: { 
              minimumWageRates: {
                unskilled: { basic: unskilled.basic, vda: unskilled.vda },
                semiSkilled: { basic: semiSkilled.basic, vda: semiSkilled.vda },
                skilled: { basic: skilled.basic, vda: skilled.vda },
                clerical: { basic: clerical.basic, vda: clerical.vda },
              } 
            } 
          },
          { new: true, upsert: true } // Return the updated document, create if it doesn't exist
        );
    
        logger.info(
          `${ip}: API /api/v1/settings/add/minimumwage | User: ${user.name} | Updated Minimum Wage Rates for client_id: ${client_id}`
        );
    
        return res.status(200).json({
          data: record,
          message: "Minimum Wage Rates Updated Successfully!",
        });
      } catch (err) {
        logger.error(
          `${ip}: API /api/v1/settings/add/minimumwage | User: ${user.name} | Error: ${err.message}`
        );
        return res.status(500).json({ error: err.message });
      }
    };
    
    const addWagePeriod = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const user = req.user;
      const { wagePeriod } = req.body;
      const client_id = req.params.client_id;
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`${ip}: API /wage/period | User: ${user.name} | Validation Error`);
        return res.status(400).json({ errors: errors.array() });
      }
    
      try {
        let record = await Settings.findOneAndUpdate(
          { client_id },
          { $set: { wagePeriod } },
          { new: true, upsert: true }
        );
    
        logger.info(`${ip}: API /wage/period | User: ${user.name} | Wage Period Updated`);
        return res.status(201).json(record);
      } catch (err) {
        logger.error(`${ip}: API /wage/period | Error: ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
    };
    
    //@desc Add or Update Salary Inspector details
    //@route POST /api/v1/settings/salary/inspector/:client_id
    //@access Private: Needs Login
    const handleSalaryInspector = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const user = req.user;
      const client_id = req.params.client_id;
      const { name, address } = req.body;

      if (!name || !address) {
        return res.status(400).json({ message: "Name and Address are required" });
      }

      try {
        let record = await Settings.findOneAndUpdate(
          { client_id },
          { $set: {salaryInspector: {name,address}} },
          { new: true, upsert: true }
        );

        logger.info(`${ip}: API /salary/inspector | User: ${user.name} | Salary Inspector updated`);
        return res.status(200).json({ message: "Salary Inspector saved", data: record });
      } catch (err) {
        logger.error(`${ip}: API /salary/inspector | Error: ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
    };

    //@desc Update Monthly Salary Date
    //@route POST /api/v1/settings/salary/monthly-date
    //@access Private
    const updateMonthlySalaryDate = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const client_id = req.params.id;
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`${ip}: Invalid date in /salary/monthly-date | ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
      }
    
      const { monthly_salary_date } = req.body;
    
      try {
        const record = await Settings.findOneAndUpdate(
          { client_id },
          { $set: { monthly_salary_date } },
          { new: true, upsert: true }
        );
    
        if (!record) {
          return res.status(404).json({ message: "Client Settings Not Found" });
        }
    
        logger.info(`${ip}: Updated monthly salary date to ${monthly_salary_date} for client_id: ${client_id}`);
        return res.status(200).json({
          message: "Monthly Salary Date updated successfully",
          data: record,
        });
      } catch (err) {
        logger.error(`${ip}: Error updating salary date | ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
    };

    const handleRegistrationUpdate = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const client_id = req.params.client_id;
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`${ip}: Invalid weekly off data | ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
      }
    
      const { registration_number, weekly_off } = req.body;
    
      try {
        const record = await Settings.findOneAndUpdate(
          { client_id },
          {
            $set: {
              registration_number: [registration_number, weekly_off], // Save both as one array
            },
          },
          { new: true, upsert: true }
        );
    
        logger.info(`${ip}: Stored registration number and weekly off type as array for client_id ${client_id}`);
        return res.status(200).json({ message: "Weekly Off Info updated", data: record });
      } catch (err) {
        logger.error(`${ip}: Error saving weekly off info | ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
    };
    
    const updateShifts = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const client_id = req.params.client_id;
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error(`${ip}: Invalid shifts data | ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
      }
    
      const { shifts } = req.body;
    
      try {
        const record = await Settings.findOneAndUpdate(
          { client_id },
          { $set: { shifts } },
          { new: true, upsert: true }
        );
    
        logger.info(`${ip}: Updated shifts for client_id ${client_id}`);
        return res.status(200).json({ message: "Shifts updated", data: record });
      } catch (err) {
        logger.error(`${ip}: Error saving shifts | ${err.message}`);
        return res.status(500).json({ error: err.message });
      }
    };
    
    
    //@desc Get All Settings for a Specific Client
    //@route GET /api/v1/settings/getall/:client_id
    //@access Private: Needs Login
    const getSettings = async (req, res) => {
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const user = req.user;
      const client_id = req.params.client_id;

      try {
        // Find the settings for the given client
        const settings = await Settings.findOne({ client_id });
        if (!settings) {
          logger.warn(
            `${ip}: API /api/v1/settings/getall/${client_id} | User: ${user.name} | Settings not found`
          );
          return res.status(404).json({ message: "Settings not found" });
        }

        logger.info(
          `${ip}: API /api/v1/settings/getall/${client_id} | User: ${user.name} | Settings retrieved successfully`
        );
        return res.status(200).json({ data: settings });
      } catch (err) {
        logger.error(
          `${ip}: API /api/v1/settings/getall/${client_id} | User: ${user.name} | Error: ${err.message}`
        );
        return res.status(500).json({ error: err.message });
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
  sendOtp,
  validateOtp,
  testLeavesAPI,
  addLeaves,
  addOtRate,
  addMinimumWage,
  addWagePeriod,
  handleSalaryInspector,
  updateMonthlySalaryDate,
  handleRegistrationUpdate,
  updateShifts,
  getSettings,
};
