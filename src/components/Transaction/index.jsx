import { Link } from "react-router-dom";
import { DeleteButton, TransactionContainer, Value } from "./styled";
import useRegistry from "../../hooks/useRegistry";

export default function Transaction({
  _id,
  value,
  type,
  description,
  date,
  token,
  handleDeleteRegistry,
}) {
  const { setRegistry } = useRegistry();
  return (
    <>
      <TransactionContainer>
        <div>
          <p>{date}</p>
          <Link
            to={`/editar-registro/${type}/${_id}`}
            onClick={() => setRegistry({ value, description })}
          >
            <span data-test="registry-name">{description}</span>
          </Link>
        </div>
        <div>
          <Value type={type} data-test="registry-amount">
            {Number(value).toFixed(2).toString().replace(".", ",")}
          </Value>
          <DeleteButton onClick={() => handleDeleteRegistry(_id, token)} data-test="registry-delete">
            X
          </DeleteButton>
        </div>
      </TransactionContainer>
    </>
  );
}
