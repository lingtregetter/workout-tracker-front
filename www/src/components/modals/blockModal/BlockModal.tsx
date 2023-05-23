import { FC, useState } from "react";
import "./BlockModal.scss";
import { BlockModalProperties } from "../../../interfaces/block-modal-properties";
import Modal from "../modal/Modal";
import Button from "../../button/Button";
import { v4 as uuidv4 } from "uuid";
import httpClient from "../../../services/http-client";
import { useParams } from "react-router-dom";
import { BlockInputData } from "../../../interfaces/block-input-data";

const BlockModal: FC<BlockModalProperties> = (props) => {
  const params = useParams();
  const [blocksInputData, setBlocksInputData] = useState<BlockInputData[]>([
    {
      key: `block-${uuidv4()}`,
    },
  ]);

  const containsOnlySpacesOrTabs = (inputString: string) => {
    const pattern: RegExp = /^[ \t]+$/;
    return pattern.test(inputString);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const blocks = blocksInputData
      .map((i) => {
        if (i.value! && !containsOnlySpacesOrTabs(i.value?.trim())) {
          return i.value?.trim();
        }
      })
      .filter((i) => i);

    try {
      await httpClient(true).post("/v1/TrainingBlocks", {
        trainingProgramId: params.programId,
        blocks: blocks,
      });

      await props.onSuccess();
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  return (
    <Modal onCancel={props.onCancel}>
      <h2>Add blocks</h2>
      <form onSubmit={onSubmit}>
        {blocksInputData.map((input) => {
          return (
            <input
              style={{ border: "1px solid #185a9d" }}
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
            fill="#185a9d"
            d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"
          />
        </svg>
        <Button
          text={"Create"}
          onClick={() => {}}
          type={"primary"}
          style={{ margin: "0 auto" }}
          btnType="submit"
        ></Button>
      </form>
    </Modal>
  );
};

export default BlockModal;
