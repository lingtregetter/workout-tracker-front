import { UUID } from "crypto";
import { PersonalInformation } from "../interfaces/domain-properties/personal-information";
import { UserProgram } from "../interfaces/domain-properties/user-program";
import httpClient from "./http-client";

const personalInfoBasePath = "/v1/PersonalInformations";

const getUserPrograms = async () => {
  return await httpClient().get<UserProgram[]>("/v1/UserPrograms");
};

const getPersonalInfo = async () => {
  return await httpClient().get<PersonalInformation>(personalInfoBasePath);
};

const updatePersonalInfo = async (
  id: UUID,
  gender: "Female" | "Male" | "Unknown",
  height: number,
  weight: number
) => {
  await httpClient().put(`${personalInfoBasePath}/${id}`, {
    id,
    gender,
    height,
    weight,
  });
};

const createPersonalInfo = async (
  id: string,
  gender: "Female" | "Male" | "Unknown",
  height: number,
  weight: number
) => {
  await httpClient().post(personalInfoBasePath, {
    id,
    gender,
    height,
    weight,
  });
};

export {
  getUserPrograms,
  getPersonalInfo,
  updatePersonalInfo,
  createPersonalInfo,
};
