import styled from "styled-components";
import { useNavigate } from "react-router-dom"

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiTrash } from "react-icons/hi2"
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const moveBack = useMoveBack();
  const navigate = useNavigate()
  const { isDeleting, deleteBooking } = useDeleteBooking()

  if (isLoading || isCheckingOut) return <Spinner />
  const { status, id: bookingId } = booking


  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          {status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}
          {status === "checked-in" && <Button onClick={() => checkout(bookingId)}>Check out</Button>}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          <Modal.Open opens="delete">
            <Button icon={<HiTrash />}>Delete Booking</Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(bookingId, {
            onSettled: () => {
              // onSettled -> mutate no matter it is success or error
              navigate(-1)
            }
          })} />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
