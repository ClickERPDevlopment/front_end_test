import { getRoutes, RouteLayout } from "@/app/constants";
import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { MODAL_KEYS } from "@/types/global";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { clearOperationMessages, clearOperationState, getOperation, setOperationValidationErrors, updateOperationField } from "../../reduxSlices/operationSlice";
import { IOperation, operationSchema, OperationValidationErrors } from "./operation.interface";

const OperationForm = () => {
    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { operation, error, message, validationErrors } = useSelector((state: RootState) => state.operation);
    const { sections } = useSelector((state: RootState) => state.section);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
 const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);
    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearOperationMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearOperationMessages());
        }

    }, [message]);

    useEffect(() => {
        document.title = "Operation Setup Add";
        console.log("OperationTypeForm mounted");
        setPageTitle("Operation Type Add");
        // dispatch(fetchAllProductionType());

        dispatch(setDropdownData({
            name: 'productTypes',
            data: [
                { id: 1, name: 'T-shirt' },
                { id: 2, name: 'Polo shirt' },
                { id: 3, name: 'Shirt' },
                { id: 4, name: 'Tank top' },
                { id: 5, name: 'Sweatshirt' },
                { id: 6, name: 'Hoodie' },
                { id: 7, name: 'Jacket' },
                { id: 8, name: 'Jeans' },
                { id: 9, name: 'Trousers' },
                { id: 10, name: 'Shorts' },
                { id: 11, name: 'Skirt' },
                { id: 12, name: 'Leggings' },
                { id: 13, name: 'Dress' },
                { id: 14, name: 'Blouse' },
                { id: 15, name: 'Kurti' },
                { id: 16, name: 'Sweater' },
                { id: 17, name: 'Cardigan' },
                { id: 18, name: 'Underwear' },
                { id: 19, name: 'Nightwear' },
                { id: 20, name: 'Sportswear' },
                { id: 21, name: 'Uniform' },
                { id: 22, name: 'Workwear' }
            ],
            labelKey: 'name',
            valueKey: 'id',
        }));

        dispatch(setDropdownData({
            name: 'itemTypes',
            data: [
                { id: 1, name: 'Top Wear' },
                { id: 2, name: 'Bottom Wear' },
                { id: 3, name: 'One Piece' },
                { id: 4, name: 'Outerwear' },
                { id: 5, name: 'Activewear' },
                { id: 6, name: 'Loungewear' },
                { id: 7, name: 'Nightwear' },
                { id: 8, name: 'Undergarment' },
                { id: 9, name: 'Workwear' },
                { id: 10, name: 'Uniform' },
                { id: 11, name: 'Maternity Wear' },
                { id: 12, name: 'Kidswear' },
                { id: 13, name: 'Infant Wear' },
                { id: 14, name: 'Accessories' }
            ],
            labelKey: 'name',
            valueKey: 'id',
        }));

        dispatch(setDropdownData({
            name: 'grade',
            data: [
                { id: 1, name: 'Grade A (Export Quality)' },
                { id: 2, name: 'Grade B (Minor Defects)' },
                { id: 3, name: 'Grade C (Major Defects)' },
                { id: 4, name: 'Sample Garment' },
                { id: 5, name: 'Rejected' },
                { id: 6, name: 'Altered / Repaired' },
                { id: 7, name: 'Wash Reject' },
                { id: 8, name: 'Spot Reject' }
            ],
            labelKey: 'name',
            valueKey: 'id',
        }));

        dispatch(setDropdownData({
            name: 'machine',
            data: [
                { id: 1, name: 'Single Needle Lock Stitch Machine' },
                { id: 2, name: 'Overlock Machine (3/4/5 Thread)' },
                { id: 3, name: 'Flatlock Machine' },
                { id: 4, name: 'Button Stitch Machine' },
                { id: 5, name: 'Buttonhole Machine' },
                { id: 6, name: 'Bar Tack Machine' },
                { id: 7, name: 'Feed-off-the-Arm Machine' },
                { id: 8, name: 'Blind Stitch Machine' },
                { id: 9, name: 'Coverstitch Machine' },
                { id: 10, name: 'Zigzag Sewing Machine' },
                { id: 11, name: 'Elastic Inserting Machine' },
                { id: 12, name: 'Snap Button Machine' },
                { id: 13, name: 'Fusing Machine' },
                { id: 14, name: 'Steam Iron/Press' },
                { id: 15, name: 'Embroidery Machine' },
                { id: 16, name: 'Laser Cutting Machine' },
                { id: 17, name: 'Auto Pocket Setter' },
                { id: 18, name: 'Loop Making Machine' },
                { id: 19, name: 'Computerized Sewing Machine' },
                { id: 20, name: 'Heat Seal Machine' }
            ],
            labelKey: 'name',
            valueKey: 'id',
        }));

        dispatch(setDropdownData({
            name: 'operationSection',
            data: [
                { id: 1, name: 'Cutting' },
                { id: 2, name: 'Sewing' },
                { id: 3, name: 'Finishing' },
                { id: 4, name: 'Trimming' },
                { id: 5, name: 'Pressing / Ironing' },
                { id: 6, name: 'Packing' },
                { id: 7, name: 'Washing' },
                { id: 8, name: 'Embroidery' },
                { id: 9, name: 'Printing' },
                { id: 10, name: 'Quality Control (Inline)' },
                { id: 11, name: 'Quality Control (Final)' },
                { id: 12, name: 'Sampling' },
                { id: 13, name: 'Marker & CAD' },
                { id: 14, name: 'Fabric Inspection' },
                { id: 15, name: 'Store' },
                { id: 16, name: 'Maintenance' },
                { id: 17, name: 'Line Feeding' },
                { id: 18, name: 'Supervision / Line Chief' }
            ],
            labelKey: 'name',
            valueKey: 'id',
        }));



        return () => {
            document.title = "";
            dispatch(clearOperationState());

        };
    }, [dispatch]);

    useEffect(() => {

        if (id) {
            document.title = "OperationType Edit";
            setPageTitle("OperationType Edit");
            setIsUpdateMode(true);
            dispatch(getOperation(Number(id)))
        }

    }, [id]);

    const handleChange = (key: keyof IOperation, value: string, displayValue?: string) => {
        dispatch(
            updateOperationField({
                key: key,
                value: value,
            })
        );
    };

    const handleCheckboxChange = (key: keyof IOperation, value: boolean) => {
        dispatch(
            updateOperationField({
                key: key,
                value: value,
            })
        );
    };


    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.OPERATION_SAVE);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = operationSchema.safeParse(operation);

        if (!parseResult.success) {
            const errors: OperationValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof IOperation;
                errors[key] = issue.message;
            }

            dispatch(setOperationValidationErrors(errors));
            return;
        }

        // if (isUpdateMode) {
        //     dispatch(editOperation({ id: Number(id), payload: operation }));
        // } else {
        //     dispatch(addOperation(operation));
        // }

    };

    const openModal = (id: number) => {

        navigate(`/webapp/modal/${MODAL_KEYS.IE_MACHINES_ADD}`, {
            state: {
                backgroundLocation: {
                    pathname: location.pathname,
                    search: location.search,
                    hash: location.hash,
                }
            }, // this is key
        });
    };

    return (
        <>

            <Panel
                header={
                    <PageHeader
                        title={pageTitle}
                    />
                }

                footer={
                    <div className="flex items-center justify-between p-2 border-b border-gray-200">
                        <Button
                            onClick={handleSubmit}
                            size="sm"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            <FontAwesomeIcon icon={faSave} /> Save Change
                        </Button>

                        <Button
                            onClick={handleBack}
                            size="sm"
                            variant="outlined"
                            className="px-4 py-2 float-end bg-white text-black rounded hover:bg-gray-200">
                            <FontAwesomeIcon icon={faBackward} /> Back
                        </Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <FormField
                        label='Section'
                        id='Section'
                        variant='block'
                        error={validationErrors?.section}
                    >
                        <SelectDropdown
                            options={sections}
                            value={operation.operationSection}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="id"
                            onChange={(val) => handleChange("operationSection", val)}
                            className="text-sm w-full"
                        />
                    </FormField>
                    <FormField
                        label="Product Type"
                        id="ProductType"
                        variant="block"
                        error={validationErrors?.productType}
                    >

                        <DropdownAutoSuggest
                            className=""
                            name="productTypes"
                            inputWidth={200}
                            value={operation.productType}
                            onSelect={(val, displayVal) => handleChange('productType', val, displayVal)} />

                    </FormField>
                    <FormField
                        label="Item Type"
                        id="ItemType"
                        variant="block"
                        error={validationErrors?.itemType}
                    >
                        <DropdownAutoSuggest
                            className=""
                            name="itemTypes"
                            inputWidth={200}
                            value={operation.itemType}
                            onSelect={(val, displayVal) => handleChange('itemType', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Operation Name"
                        id="OperationName"
                        variant="block"
                        error={validationErrors?.operationName}
                    >

                        <SimpleInputBox
                            value={operation.operationName}
                            onChange={(val) => handleChange("operationName", val)}
                            id="code"
                            placeholder="Product Type"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Operation Local Name"
                        id="OperationLocalName"
                        variant="block"
                        error={validationErrors?.operationLocalName}
                    >

                        <SimpleInputBox
                            value={operation.operationLocalName}
                            onChange={(val) => handleChange("operationLocalName", val)}
                            id="operationLocalName"
                            placeholder="Product Type"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Grade"
                        id="Grade"
                        variant="block"
                        error={validationErrors?.grade}
                    >
                        <DropdownAutoSuggest
                            className=""
                            name="grade"
                            inputWidth={200}
                            value={operation.grade}
                            onSelect={(val, displayVal) => handleChange('grade', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="SMV"
                        id="SMV"
                        variant="block"
                        error={validationErrors?.smv}
                    >

                        <SimpleInputBox
                            value={operation.smv}
                            onChange={(val) => handleChange("smv", val)}
                            id="smv"
                            placeholder="SMV"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Machine"
                        id="Machine"
                        variant="block"
                        error={validationErrors?.machine}
                    >

                        <DropdownAutoSuggest
                            className="h-8"
                            name="machine"
                            inputWidth={200}
                            value={operation.machine}
                            onSelect={(val, displayVal) => handleChange('machine', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Operation Type"
                        id="Operation Type"
                        variant="block"
                        error={validationErrors?.operationType}
                    >

                        <SimpleInputBox
                            value={operation.operationType}
                            onChange={(val) => handleChange("operationType", val)}
                            id="operationType"
                            placeholder="Operation Type"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Operation Section"
                        id="OperationSection"
                        variant="block"
                        error={validationErrors?.operationSection}
                    >
                        <DropdownAutoSuggest
                            className="h-8"
                            name="operationSection"
                            inputWidth={200}
                            value={operation.operationSection}
                            onSelect={(val, displayVal) => handleChange('operationSection', val, displayVal)} />
                    </FormField>
                    <FormField
                        label="Pressure Foot"
                        id="PressureFoot"
                        variant="block"
                        error={validationErrors?.pressureFoot}
                    >

                        <SimpleInputBox
                            value={operation.pressureFoot}
                            onChange={(val) => handleChange("pressureFoot", val)}
                            id="pressureFoot"
                            placeholder="Pressure Foot"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Guide/Folder"
                        id="GuideFolder"
                        variant="block"
                        error={validationErrors?.guideFolder}
                    >

                        <SimpleInputBox
                            value={operation.guideFolder}
                            onChange={(val) => handleChange("guideFolder", val)}
                            id="guideFolder"
                            placeholder="Guide/Folder"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Attachment"
                        id="Attachment"
                        variant="block"
                        error={validationErrors?.attachment}
                    >

                        <SimpleInputBox
                            value={operation.attachment}
                            onChange={(val) => handleChange("attachment", val)}
                            id="attachment"
                            placeholder="Attachment"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Remarks"
                        id="Remarks"
                        variant="block"
                        error={validationErrors?.remarks}
                    >

                        <SimpleInputBox
                            value={operation.remarks}
                            onChange={(val) => handleChange("remarks", val)}
                            id="remarks"
                            placeholder="Remarks"
                            className="w-full"
                        />
                    </FormField>
                </div>
                <div className="pt-2">
                    <FormField
                        label=""
                        id="IsActive"
                        variant="block"
                        error={validationErrors?.isActive}
                    >
                        <Checkbox
                            id='isActive'
                            label="Is Active?"
                            checked={operation.isActive}
                            onChange={(val) => handleCheckboxChange("isActive", val)}
                            size='small'
                        ></Checkbox>
                    </FormField>
                </div>
            </Panel >
        </>
    );
};

export default OperationForm;

