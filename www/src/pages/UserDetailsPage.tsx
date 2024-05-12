import { FC, useEffect, useState } from "react";
import MainView from "../components/main-view/MainView";
import UserDetailsCard from "../components/user-details-card/UserDetailsCard";
import { PersonalInformation } from "../interfaces/domain-properties/personal-information";
import { getPersonalInfo } from "../services/user.service";

const UserDetailsPage: FC = () => {
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformation>();

  useEffect(() => {
    loadUserPersonalInformation();
  }, []);

  const loadUserPersonalInformation = async () => {
    try {
      const response = await getPersonalInfo();
      setPersonalInformation(response.data);
    } catch (e) {}
  };

  return (
    <>
      <MainView title={"User details"}>
        <UserDetailsCard
          personalInformation={personalInformation!}
          onSuccess={loadUserPersonalInformation}
        ></UserDetailsCard>
      </MainView>
    </>
  );
};

export default UserDetailsPage;
