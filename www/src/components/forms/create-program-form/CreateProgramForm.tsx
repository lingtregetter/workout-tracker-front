import { CSSProperties, FC, useState } from "react";
import "./CreateProgramForm.scss";
import { BlockInputData } from "../../../interfaces/block-input-data";
import { v4 as uuidv4 } from "uuid";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import { CreateProgramFormProperties } from "../../../interfaces/create-program-form-properties";
import PlusButton from "../../svg/PlusButton";

const CreateProgramForm: FC<CreateProgramFormProperties> = (props) => {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState<string>();
  const [programDescription, setProgramDescription] = useState<string>();
  const [blocksInputData, setBlocksInputData] = useState<BlockInputData[]>([
    {
      key: `block-${uuidv4()}`,
    },
  ]);
  // validation
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const containsOnlySpacesOrTabs = (inputString: string) => {
    const pattern: RegExp = /^[ \t]+$/;
    return pattern.test(inputString);
  };

  const isProgramNameInvalid =
    !programName ||
    programName.length === 0 ||
    containsOnlySpacesOrTabs(programName);

  const blockInputDataToBlocks = blocksInputData
    .map((i) => {
      if (i.value! && !containsOnlySpacesOrTabs(i.value?.trim())) {
        return i.value?.trim();
      }
    })
    .filter((i) => i) as string[];

  const isBlocksInvalid = blockInputDataToBlocks.length === 0;

  const formStyle: CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <>
      <form
        style={formStyle}
        onSubmit={(event) => {
          event.preventDefault();

          props.onSubmit(
            programName!,
            blockInputDataToBlocks,
            programDescription
          );
        }}
      >
        <label htmlFor="programName" className="main-label">
          Program name *
        </label>
        {isFormInvalid && isProgramNameInvalid && (
          <p className="invalid-message">* Please add a program name</p>
        )}
        <input
          type="text"
          name="programName"
          onChange={(event) => {
            setProgramName(event.target.value);
          }}
        />
        <label htmlFor="programDescription" className="main-label">
          Program description
        </label>
        <textarea
          name="programDescription"
          style={{
            border: "none",
            boxSizing: "border-box",
            height: "100px",
            marginBottom: "10px",
            padding: "10px",
            width: "100%",
          }}
          onChange={(event) => {
            setProgramDescription(event.target.value);
          }}
        ></textarea>
        <label htmlFor="addBlocks" className="main-label">
          Add blocks:
        </label>
        {isFormInvalid && isBlocksInvalid && (
          <p className="invalid-message">* Please add blocks</p>
        )}
        {blocksInputData.map((input) => {
          return (
            <input
              type="text"
              key={input.key}
              name={input.key}
              onChange={(event) => {
                const value = event.target.value;
                const data: BlockInputData = {
                  key: input.key,
                  value: value.length === 0 ? undefined : value,
                };

                setBlocksInputData((previous) => {
                  const newList = previous.map((previousInput) => {
                    if (previousInput.key === input.key) {
                      return data;
                    }
                    return previousInput;
                  });
                  return newList;
                });
              }}
            />
          );
        })}
        <PlusButton
          onClick={() => {
            setBlocksInputData((list: BlockInputData[]) => {
              return [...list, { key: `block-${uuidv4()}` }];
            });
          }}
          fill="#fff"
        ></PlusButton>

        <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
          <Button
            text={"Create"}
            onClick={() => {
              if (isProgramNameInvalid) {
                if (!isFormInvalid) setIsFormInvalid((value) => !value);
                return;
              }
            }}
            type={"secondary"}
            btnType="submit"
          ></Button>
          <Button
            text={"Back"}
            onClick={() => {
              navigate("/programs");
            }}
            type={"outlined"}
          ></Button>
        </div>
      </form>
    </>
  );
};

export default CreateProgramForm;
