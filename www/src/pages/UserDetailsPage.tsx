import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import UserDetailsCard from "../components/user-details-card/UserDetailsCard";
import httpClient from "../services/http-client";
import { PersonalInformation } from "../interfaces/personal-information";

const UserDetailsPage: FC = () => {
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformation>();

  useEffect(() => {
    loadUserPersonalInformation();
  }, []);

  const loadUserPersonalInformation = async () => {
    try {
      const response = await httpClient().get<PersonalInformation[]>(
        "/v1/PersonalInformations"
      );
      setPersonalInformation(response.data[0]);
    } catch (e) {}
  };
  return (
    <>
      <MainView title={"User details"}>
        {personalInformation && (
          <UserDetailsCard
            personalInformation={personalInformation}
            onSuccess={loadUserPersonalInformation}
          ></UserDetailsCard>
        )}
      </MainView>
    </>
  );
};

export default UserDetailsPage;
