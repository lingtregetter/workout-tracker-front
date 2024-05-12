import { FC, FormEvent, useEffect, useState } from "react";
import "./UserDetailsCard.scss";
import Button from "../button/Button";
import { UserDetailsCardProperties } from "../../interfaces/user-details-card-properties";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/auth-context";
import {
  createPersonalInfo,
  updatePersonalInfo,
} from "../../services/user.service";

const UserDetailsCard: FC<UserDetailsCardProperties> = (props) => {
  const personalInformation = props.personalInformation;

  const navigate = useNavigate();
  const [gender, setGender] = useState<
    "Female" | "Male" | "Unknown" | undefined
  >(personalInformation?.gender);
  const [height, setHeight] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const auth = useAuth();

  useEffect(() => {
    setHeight(personalInformation?.height);
    setWeight(personalInformation?.weight);
    setGender(personalInformation?.gender);
  }, [personalInformation]);

  const updateDetailsOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await updatePersonalInfo(
        personalInformation!.id,
        gender!,
        height!,
        weight!
      );
      await props.onSuccess();
      setIsReadOnly((isReadOnly) => !isReadOnly);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const saveDetailsOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const details = {
      id: auth.userId,
      gender,
      height,
      weight,
    };

    try {
      await createPersonalInfo(auth.userId!, gender!, height!, weight!);
      await props.onSuccess();
      setIsReadOnly((isReadOnly) => !isReadOnly);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <>
      <form
        className="user-details__form"
        onSubmit={
          personalInformation ? updateDetailsOnSubmit : saveDetailsOnSubmit
        }
      >
        <label htmlFor="gender">Gender</label>
        {isReadOnly && personalInformation ? (
          <div className="flex">
            <input
              type="radio"
              value={gender}
              checked={true}
              name="gender"
              disabled={isReadOnly}
            />
            <label htmlFor="gender">{gender}</label>
          </div>
        ) : (
          <>
            <div className="flex">
              <input
                type="radio"
                value="Female"
                checked={"Female" === gender}
                name="gender"
                onChange={() => setGender("Female")}
                disabled={isReadOnly}
              />
              <label htmlFor="gender">Female</label>
            </div>
            <div className="flex">
              <input
                type="radio"
                value="Male"
                checked={"Male" === gender}
                name="gender"
                onChange={() => setGender("Male")}
                disabled={isReadOnly}
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
                disabled={isReadOnly}
              />
              <label htmlFor="">Unknown</label>
            </div>
          </>
        )}
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
            text={personalInformation ? "Update" : "Save"}
            onClick={() => {}}
            type={"outlined"}
            btnType="submit"
            style={{ margin: "0 auto" }}
          ></Button>
        )}
      </form>

      {isReadOnly && (
        <div style={{ display: "flex", gap: "30px" }}>
          <Button
            text={personalInformation ? "Edit details" : "Add details"}
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
