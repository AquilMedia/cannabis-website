import React, { useState } from "react";
import LoginModal from "./LoginModal";

interface User {
  id: string;
  pharmacist_id?: string;

}

interface Pharmacist {
  id: string;
  name: string;
}

interface Product {
  id?: string;
  product_id?: string;
  name?: string;

}


interface PharmacistSelectModalProps {
  pharmacists: Pharmacist[];
  onSelect: (pharmacist_id: string) => void;
  onClose: () => void;
}

const PharmacistSelectModal: React.FC<PharmacistSelectModalProps> = ({
  pharmacists,
  onSelect,
  onClose,
}) => {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleAdd = () => {
    if (selectedId) {
      onSelect(selectedId);
    } else {
      alert("Please select a pharmacist");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Select Pharmacist</h3>
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">-- Select --</option>
          {pharmacists.map((pharma) => (
            <option key={pharma.id} value={pharma.id}>
              {pharma.name}
            </option>
          ))}
        </select>
        <div style={{ marginTop: 20 }}>
          <button onClick={handleAdd}>Add to Cart</button>
          <button onClick={onClose} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface AddToCartProps {
  user: User | null;
  pharmacists: Pharmacist[];
  product: Product;
}

const AddToCart: React.FC<AddToCartProps> = ({ user, pharmacists, product }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPharmaModal, setShowPharmaModal] = useState<boolean>(false);

  const startAddToCart = () => {
    if (!user) {
      setShowLogin(true);
    } else {
      setShowPharmaModal(true);
    }
  };


  const handlePharmacistSelect = (pharmacist_id: string) => {
    setShowPharmaModal(false);

    const cartItem = [
      {
        product_id: product.id || product.product_id || "",
        quantity: 1, 
        pharmacist_id,
      },
    ];

 
  };

  return (
    <>
      <button onClick={startAddToCart}>Add to Cart</button>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {showPharmaModal && (
        <PharmacistSelectModal
          pharmacists={pharmacists}
          onSelect={handlePharmacistSelect}
          onClose={() => setShowPharmaModal(false)}
        />
      )}
    </>
  );
};

export default AddToCart;
