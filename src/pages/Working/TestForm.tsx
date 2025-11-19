import React, { useState } from "react";
import Button from "../../components/form/Button";
import FeatherIcon from "../../components/FeatherIcon";
import { Search, PlusCircle } from "react-feather";
import SelectDropdown from "../../components/form/SelectDropdown";
import Modal from "../../components/feedback-interaction/Modal";
import Checkbox from "../../components/form/Checkbox";
import RadioButton from "../../components/form/RadioButton";
import Switcher from "../../components/form/Switcher";
// import AutoSuggest from "../../components/AutoSuggest";
// import { fetchOptions } from "../../features/options/optionsSlice";

type ColorOption = {
    id: string;
    name: string;
};

type GarmentProduct = {
    id: string;
    name: string;
};

const TestForm: React.FC = () => {
    const [selectedColor, setSelectedColor] = useState<ColorOption | undefined>(undefined);
    const [selectedProduct, setSelectedProduct] = useState<GarmentProduct | undefined>(undefined);
    const [selectedSize, setSelectedSize] = useState<string>('');

    const colorOptions: ColorOption[] = [
        { id: "1", name: "Red" },
        { id: "2", name: "Blue" },
    ];

    const garmentsProductList: GarmentProduct[] = [
        { id: "1", name: "Red T-Shirt" },
        { id: "2", name: "Blue Jeans" },
        { id: "3", name: "Green Jacket" },
        { id: "4", name: "Black Dress" },
        { id: "5", name: "White Shirt" },
    ];

    const sizes = ["Small", "Medium", "Large"];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // const staticOptions = [
    //     { label: "Apple", value: "Apple" },
    //     { label: "Banana", value: "Banana" },
    //     { label: "Cherry", value: "Cherry" },
    // ];

    return (
        <div className="p-5 bg-gray-50 rounded shadow-md">
            {/* Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <SelectDropdown<ColorOption>
                    options={colorOptions}
                    value={selectedColor?.id || ""}
                    onChange={(_, item) => setSelectedColor(item)}
                    isSameKeyValue={false}
                    valueKey="id"
                    labelKey="name"
                    className="border-gray-300"
                    variant="bordered"
                />

                <SelectDropdown<GarmentProduct>
                    options={garmentsProductList}
                    value={selectedProduct?.id || ""}
                    onChange={(_, item) => setSelectedProduct(item)}
                    isSameKeyValue={false}
                    valueKey="id"
                    labelKey="name"
                    className="border-gray-300"
                    variant="default"
                />

                <SelectDropdown
                    options={sizes}
                    value={selectedSize}
                    onChange={(val) => setSelectedSize(val)}
                    isSameKeyValue={true}
                    variant="flat"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 lg:col-span-4 flex flex-wrap gap-2">
                    <Button onClick={() => alert("Clicked")}>
                        <FeatherIcon icon={Search} /> Search
                    </Button>
                    <Button variant="flat">
                        <FeatherIcon icon={Search} /> Search
                    </Button>
                    <Button variant="outlined">
                        <FeatherIcon icon={Search} /> Search
                    </Button>
                    <Button variant="outlined" href="a">
                        <FeatherIcon icon={Search} /> Search
                    </Button>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 lg:col-span-4 flex flex-wrap gap-2">
                    {/* <AutoSuggest
                        fetchOptionsThunk={fetchOptions}
                        onSelect={(val) => console.log("Selected:", val)}
                    /> */}

                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 lg:col-span-4 flex flex-wrap gap-2">
                    <Button onClick={openModal}>
                        <FeatherIcon icon={PlusCircle} /> Open Modal
                    </Button>
                    {/* Modal */}
                    <Modal isOpen={isModalOpen} onClose={closeModal} widthClass="max-w-3xl" heightClass="h-auto">
                        <h3 className="text-lg font-semibold mb-4">Dynamic Content Inside Modal</h3>
                        <p>This is your modal content here.</p>
                    </Modal>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 sm:grid-cols-1 md:grid-cols-2 lg:col-span-4 flex flex-wrap gap-2">
                    <Checkbox label="I agree to terms" size="small" />
                    <Checkbox label="Subscribe to newsletter" shape="square" dotted />
                    <Checkbox label="I am disabled" disabled />
                    <Checkbox label="Use secondary color" color="secondary" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 sm:grid-cols-1 md:grid-cols-2 lg:col-span-4 flex flex-wrap gap-2">
                    <RadioButton id="option1" label="Option 1" value="option1" name="group1" />
                    <RadioButton id="option2" label="Option 2" value="option2" name="group1" color="secondary" />
                    <RadioButton id="option-disabled" label="Disabled Option" value="option4" name="group1" disabled />
                    <RadioButton id="option-large" label="Large Option" value="option5" name="group1" size="large" />
                    <RadioButton id="option-small" label="Small Option" value="option5" name="group1" size="small" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {/* Button group that takes full width of one grid cell */}
                <div className="col-span-1 sm:grid-cols-1 md:grid-cols-2  lg:col-span-4 flex flex-wrap gap-2">
                    <Switcher
                        checked={false}
                        color="red"
                        onChange={(newState) => console.log("Switch toggled:", newState)}
                    />

                    <Switcher
                        checked={false}
                        color="blue"
                        onChange={(newState) => console.log("Switch toggled:", newState)}
                    />
                </div>
            </div>

        </div>
    );
};

export default TestForm;
