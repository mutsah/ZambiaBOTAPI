import { poolPromise, sql } from "../config/database.js";
import { shareApplicationSchema } from "../middlewares/validator.js";

const pool = await poolPromise;

export async function newApplication(req, res) {
  try {
    const {
      title,
      names,
      surname,
      postalAddress,
      nationalRegistrationNo,
      LUSEIDNo,
      email,
      bankName,
      bankAccountName,
      bankAccountNo,
      bankBranch,
      bankSwiftCode,
      sharesApplied,
      totalConsiderationPaid,
      digitalSignature1,
      digitalSignature2,
      applicationDate,
    } = req.body;

    const { error, value } = shareApplicationSchema.validate({
      title,
      names,
      surname,
      postalAddress,
      nationalRegistrationNo,
      LUSEIDNo,
      email,
      bankName,
      bankAccountName,
      bankAccountNo,
      bankBranch,
      bankSwiftCode,
      sharesApplied,
      totalConsiderationPaid,
      applicationDate,
    });

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    // Check if email already exists
    const emailCheck = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT COUNT(*) as count FROM share_applications WHERE email = @email"
      );

    if (emailCheck.recordset[0].count > 0) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }

    // Insert new application
    await pool
      .request()
      .input("title", sql.NVarChar(10), title)
      .input("names", sql.NVarChar(100), names)
      .input("surname", sql.NVarChar(50), surname)
      .input("postalAddress", sql.NVarChar(200), postalAddress)
      .input("nationalRegistrationNo", sql.NVarChar(20), nationalRegistrationNo)
      .input("LUSEIDNo", sql.NVarChar(20), LUSEIDNo)
      .input("email", sql.NVarChar(100), email)
      .input("bankName", sql.NVarChar(100), bankName)
      .input("bankAccountName", sql.NVarChar(100), bankAccountName)
      .input("bankAccountNo", sql.NVarChar(20), bankAccountNo)
      .input("bankBranch", sql.NVarChar(100), bankBranch)
      .input("bankSwiftCode", sql.NVarChar(11), bankSwiftCode)
      .input("sharesApplied", sql.Int, sharesApplied)
      .input(
        "totalConsiderationPaid",
        sql.Decimal(15, 2),
        totalConsiderationPaid
      )
      .input("digitalSignature1", sql.NVarChar(sql.MAX), digitalSignature1)
      .input("digitalSignature2", sql.NVarChar(sql.MAX), digitalSignature2)
      .input("applicationDate", sql.Date, applicationDate).query(`
        INSERT INTO share_applications (
          title, names, surname, postal_address, national_registration_no,
          luse_id_no, email, bank_name, bank_account_name, bank_account_no,
          bank_branch, bank_swift_code, shares_applied, total_consideration_paid,
          digital_signature_1, digital_signature_2, application_date
        ) VALUES (
          @title, @names, @surname, @postalAddress, @nationalRegistrationNo,
          @LUSEIDNo, @email, @bankName, @bankAccountName, @bankAccountNo,
          @bankBranch, @bankSwiftCode, @sharesApplied, @totalConsiderationPaid,
          @digitalSignature1, @digitalSignature2, @applicationDate
        )
      `);

    res
      .status(201)
      .json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
