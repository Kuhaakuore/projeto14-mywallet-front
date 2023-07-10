import { DeleteButton, TransactionContainer, Value } from "./styled";

export default function Transaction({ _id, value, type, description, date, token, handleDeleteRegistry}) {

  return (
    <>
      <TransactionContainer>
        <div>
          <p>{date}</p>
          <span>{description}</span>
        </div>
        <div>
          <Value type={type}>
            {Number(value).toFixed(2).toString().replace(".", ",")}
          </Value>
          <DeleteButton onClick={() => handleDeleteRegistry(_id, token)}>X</DeleteButton>
        </div>
      </TransactionContainer>
    </>
  );
}
