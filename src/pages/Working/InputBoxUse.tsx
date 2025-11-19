import { useState } from "react";
import { Phone, User } from "react-feather";
import Panel from "../../components/layout/Panel";
import InputBox from "../../components/rnd/InputBox";

const InputBoxUse: React.FC = () => {
  const [text, setText] = useState<string>(""); // Changed to string type
  const [number, setPhoneNumber] = useState<number | "">("");
  
  return (
    <div className="w-1/3">
      <Panel
        className=""
      //  headerClassName="bg-white border-b-1.5 border-gray-400"
       contentClassName="bg-white"
       rounded={true}
      //  header="Login Form"
      >
        {/* Text input - handles strings */}
      <InputBox
        label="User"
        type="text"
        size="sm"
        theme="light"
        value={text}
        labelPosition="left"
        icon={<User className="h-4 w-4" />}
        className="mb-1"
        onChange={(e) => setText(e.target.value)} // Directly use string value
        is_disabled={false}
        onClear={() => setText("")}
      />

      {/* Number input - handles numbers */}
      <InputBox
        label="Phone Number"
        labelWidth="w-[45%]"
        inputWidth="w-[55%]"
        type="number"
        size="sm"
        theme="light"
        value={number === "" ? "" : number}
        labelPosition="left"
        icon={<Phone className="h-4 w-4" />}
        className="mb-1"
        onChange={(e) => setPhoneNumber(e.target.value === "" ? "" : Number(e.target.value))}
        is_disabled={false}
        onClear={() => setPhoneNumber("")}
      />
      </Panel>
    </div>
    
  );
};

export default InputBoxUse;