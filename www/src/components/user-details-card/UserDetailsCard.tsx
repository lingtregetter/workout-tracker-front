import { FC, FormEvent, useState } from "react";
import "./UserDetailsCard.scss";
import Button from "../button/Button";
import { UserDetailsCardProperties } from "../../interfaces/user-details-card-properties";
import httpClient from "../../services/http-client";
import { useNavigate } from "react-router-dom";

const UserDetailsCard: FC<UserDetailsCardProperties> = (props) => {
  const personalInformation = props.personalInformation;
  const navigate = useNavigate();
  const [gender, setGender] = useState<"Female" | "Male" | "Unknown">(
    personalInformation.gender
  );
  const [height, setHeight] = useState<number>(personalInformation.height);
  const [weight, setWeight] = useState<number>(personalInformation.weight);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  const updateDetailsOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedDetails = {
      id: personalInformation.id,
      gender: gender,
      height: height,
      weight: weight,
    };

    try {
      await httpClient().put(
        `/v1/PersonalInformations/${personalInformation.id}`,
        updatedDetails
      );
      await props.onSuccess();
      setIsReadOnly((isReadOnly) => !isReadOnly);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <>
      <form className="user-details__form" onSubmit={updateDetailsOnSubmit}>
        <label htmlFor="gender">Gender</label>
        <div className="flex">
          <input
            type="radio"
            value="Female"
            checked={"Female" === gender}
            name="gender"
            onChange={() => setGender("Female")}
            readOnly={isReadOnly}
          />
          <label htmlFor="">Female</label>
        </div>
        <div className="flex">
          <input
            type="radio"
            value="Male"
            checked={"Male" === gender}
            name="gender"
            onChange={() => setGender("Male")}
            readOnly={isReadOnly}
          />
          <label htmlFor="">Male</label>
        </div>
        <div className="flex">
          <input
            type="radio"
            value="Unknown"
            checked={"Unknown" === gender}
            name="gender"
            onChange={() => setGender("Unknown")}
            readOnly={isReadOnly}
          />
          <label htmlFor="">Unknown</label>
        </div>
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          defaultValue={height}
          min={0}
          onChange={(event) => setHeight(+event.target.value)}
          readOnly={isReadOnly}
        />
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          min={0}
          defaultValue={weight}
          onChange={(event) => setWeight(+event.target.value)}
          readOnly={isReadOnly}
        />

        {!isReadOnly && (
          <Button
            text={"Update"}
            onClick={() => {}}
            type={"outlined"}
            btnType="submit"
          ></Button>
        )}
      </form>

      {isReadOnly && (
        <div className="flex">
          <Button
            text={"Edit details"}
            onClick={() => setIsReadOnly((isReadOnly) => !isReadOnly)}
            type={"outlined"}
          ></Button>
          <Button
            text={"My Programs"}
            onClick={() => navigate("/programs")}
            type={"secondary"}
          ></Button>
        </div>
      )}
    </>
  );
};

export default UserDetailsCard;
