import { TransactionContainer, Value } from "./styled";

export default function Transaction({ value, type, description, date }) {
  return (
    <>
      <TransactionContainer>
        <div>
          <p>{date}</p>
          <span>{description}</span>
        </div>
        <Value type={type}>
          {Number(value).toFixed(2).toString().replace(".", ",")}
        </Value>
      </TransactionContainer>
    </>
  );
}
