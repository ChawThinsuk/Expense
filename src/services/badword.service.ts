import pool from "../db/db";
import bcrypt from "bcrypt";
import { ServiceResultDTO } from "../dto/result.dto";
import { UserDTO } from "../dto/user.dto";
import { CustomError, handleDbError } from "../utils/handle.error";
import { AccountDTO } from "../dto/account.dto";
import { BadWordDTO } from "../dto/badword.dto";

export class BadWordService {
  async createBadWord (badWordInput: BadWordDTO): Promise<ServiceResultDTO> {
    const query = `
    INSERT INTO "tbm_BadWords" (word, created_at, updated_at)
    VALUES ($1, NOW(), NOW())
    RETURNING word_id;
  `;
  console.log(badWordInput.word);
  
    try {
      const result = await pool.query(query, [badWordInput.word]);
      const newBadWordId = result.rows[0].word_id;
      return {
        message: "Create Success",
        results: `New bad words created with ID: ${newBadWordId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while creating the bad words', 500);
    }
  }

  async getAllBadWords (): Promise<ServiceResultDTO> {
    const query = `
    SELECT word FROM "tbm_BadWords"
  `;
    try {
      const getAllResult = await pool.query(query);
      if (!getAllResult) {
        throw new CustomError('bad words not found', 404);
      }
      const badWords = getAllResult.rows.map((row: any) => row.word).join(', ');
        return {
          message: "Get Success",
          results: badWords,
        };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while getting the bad words', 500);
    }
  }

  async updateBadWord(
    oldBadWord: string,
    badWordInput: BadWordDTO
  ): Promise<ServiceResultDTO> {
    const updateQuery = `
    UPDATE "tbm_BadWords"
    SET word = $1, updated_at = NOW()
    WHERE word = $2
    RETURNING word_id;
  `;
    try {
      const updateResult = await pool.query(updateQuery, [badWordInput.word,oldBadWord]);
      if (updateResult.rowCount === 0) {
        throw new CustomError('Bad word not found', 400);
      }
      const updatedBadWordId = updateResult.rows[0].word_id;
      return {
        message: "Update Success",
        results: `Bad word updated with ID: ${updatedBadWordId}`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while updating the bad word', 500);
    }
  }


  async deleteBadWord(oldBadWord: string): Promise<ServiceResultDTO> {
    const deleteQuery = `
    DELETE FROM "tbm_BadWords"
    WHERE word = $1
    RETURNING word_id;
  `;
    try {
      const deleteResult = await pool.query(deleteQuery, [oldBadWord]);
      const badWordResult = deleteResult.rows[0];
      if (!badWordResult) {
        throw new CustomError('Bad Word not found', 404);
      }
      const deletedBadWordId = deleteResult.rows[0].word_id;
      return {
        message: "Delete Success",
        results: `Bad word ID: ${deletedBadWordId} has been delete`,
      };
    } catch (error: any) {
      handleDbError(error)
      throw new CustomError('An error occurred while deleting the bad word', 500);
    }
  }
}
