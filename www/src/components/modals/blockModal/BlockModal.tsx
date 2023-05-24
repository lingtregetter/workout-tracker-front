import { FC, useState } from "react";
import "./BlockModal.scss";
import { BlockModalProperties } from "../../../interfaces/modal-properties/block-modal-properties";
import Modal from "../modal/Modal";
import Button from "../../button/Button";
import { v4 as uuidv4 } from "uuid";
import httpClient from "../../../services/http-client";
import { useParams } from "react-router-dom";
import { BlockInputData } from "../../../interfaces/block-input-data";
import PlusButton from "../../svg-buttons/PlusButton";

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
        <PlusButton
          onClick={() => {
            setBlocksInputData((list: BlockInputData[]) => {
              return [...list, { key: `block-${uuidv4()}` }];
            });
          }}
          fill="#185a9d"
        ></PlusButton>
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
