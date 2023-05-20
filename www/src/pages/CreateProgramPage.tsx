import { CSSProperties, FC, useState } from "react";
import MainView from "../components/main-view/MainView";
import Button from "../components/button/Button";
import { v4 as uuidv4 } from "uuid";
import httpClient from "../services/http-client";
import { useNavigate } from "react-router-dom";

interface BlockInputData {
  key: string;
  value?: string;
}

const CreateProgramPage: FC = () => {
  const navigate = useNavigate();
  const [programName, setProgramName] = useState<string>();
  const [programDescription, setProgramDescription] = useState<string>();
  const [blocksInputData, setBlocksInputData] = useState<BlockInputData[]>([
    {
      key: `block-${uuidv4()}`,
    },
  ]);

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const blocks = blocksInputData.map((i) => i.value).filter((i) => i);
    try {
      await httpClient(true).post("/v1/TrainingPrograms", {
        programName: programName?.trim(),
        programDescription: programDescription,
        blocks: blocks,
      });
      navigate("/programs");
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  const formStyle: CSSProperties = {
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%",
  };

  return (
    <>
      <MainView title={"Create program"}>
        <form style={formStyle} onSubmit={onSubmit}>
          <label htmlFor="programName" className="main-label">
            Program name
          </label>
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
                    const index = previous.findIndex(
                      (item) => item.key === data.key
                    );
                    previous[index] = data;
                    return previous;
                  });
                }}
              />
            );
          })}

          <svg
            style={{ display: "block", margin: "0 auto 10px" }}
            id="add-btn"
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            viewBox="0 96 960 960"
            width="30"
            onClick={() => {
              setBlocksInputData((list: BlockInputData[]) => {
                return [...list, { key: `block-${uuidv4()}` }];
              });
            }}
          >
            <path
              fill="#fff"
              d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
            />
          </svg>

          <div
            style={{ display: "flex", gap: "30px", justifyContent: "center" }}
          >
            <Button
              text={"Create"}
              onClick={() => {}}
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
      </MainView>
    </>
  );
};

export default CreateProgramPage;
