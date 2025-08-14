import { useRouter } from "next/navigation";

interface OrderConfirmationModalProps {
  orderId: string;
  onClose: () => void;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ orderId, onClose }) => {
 const router = useRouter();

  return (
    <div className="cartModalOverlay" onClick={onClose}>
      <div
        className="cartModalContent orderConfirmationModal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="orderIconWrapper">
          <div className="successIcon">
            <i className="cb-icon cb-check"></i>
          </div>
        </div>

        <h2 className="f-size-22 f-w-SB clr-black text-center mt__15">
          Thank you for your order!
        </h2>
        <p className="f-size-16 clr-gray text-center mb__15">
          Order number: <span className="clr-black f-w-SB">#{orderId}</span>
        </p>

        <h3 className="f-size-18 f-w-SB clr-green text-center mb__10">
          What happens next?
        </h3>
        <p className="f-size-14 clr-gray text-center mb__15">
          You will soon receive an email from the pharmacy with:
        </p>

        <ul className="orderDetailsList">
          <li>
           <i className="cb-icon cb-check"></i> Shipping details
          </li>
          <li>
           <i className="cb-icon cb-check"></i> Payment information
          </li>
          <li>
           <i className="cb-icon cb-check"></i> Further information about your prescription
          </li>
        </ul>

        <p className="f-size-12 clr-gray text-center mt__15">
          If you have any questions, please contact the pharmacy directly at:{" "}
          <br />
          <a
            href="mailto:test@gmail.com"
            className="clr-green f-w-SB"
          >
            test@gmail.com
          </a>
        </p>

        <div className="d-flex flex-column gap-2 mt__20">
          {/* <button className="btn cb_cmnBtn w-100" onClick={() => router.push("/my-orders")}>
            Goto my orders
          </button> */}
          <button
            className="btn border-0 w-100"
            style={{ backgroundColor: "#EDEDED" }}
            onClick={() => router.push("/shop")}
          >
            Back to shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
