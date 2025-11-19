import Checkbox from "@/components/form/Checkbox";
import { FormField } from "@/components/form/FormField";
import Panel from "@/components/layout/Panel";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import TextareaBox from "@/components/form/TextareaBox";
import { useState } from "react";

const ChartOfAccountsForm = () => {

    const [accountCode, setAccountCode] = useState("");
    const [parentAccount, setParentAccount] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            <Panel>
                {/* First row of input */}
                <div className="sm:grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto max-w-5xl">
                    <FormField
                        label="Account Name"
                        id="account-name"
                        variant="block"
                        className="w-full"
                    >
                        <SelectDropdown
                            value="Account name"
                            onChange={(value) => console.log(value)}
                            placeholder="Select Account name"
                            className="w-full"
                            isSameKeyValue={false}
                            labelKey="label"
                            valueKey="value"
                            options={[
                                { label: "Account 1", value: "account-1" },
                                { label: "Account 2", value: "account-2" },
                                { label: "Account 3", value: "account-3" },
                            ]}
                        />
                    </FormField>
                    <FormField
                        label="Account Code"
                        id="account-code"
                        variant="block"
                    >
                        <SimpleInputBox
                            value={accountCode}
                            onChange={setAccountCode}
                            id="account-code"
                            placeholder="Type Account code"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Parent Account"
                        id="parent-account"
                        variant="block"
                    >
                        <SimpleInputBox
                            value={parentAccount}
                            onChange={setParentAccount}
                            id="parent-account"
                            placeholder="Type Parent Account"
                            className="w-full"
                        ></SimpleInputBox>
                    </FormField>
                </div>
                {/* Second row of description */}
                <div className="sm:grid grid-cols-1 lg:grid-cols-1 gap-4 mx-auto max-w-5xl mt-4">
                    <FormField
                        label="Description"
                        id="description"
                        variant="block"
                    >
                        <TextareaBox
                            value={description}
                            onChange={setDescription}
                            id="description"
                            placeholder="Type Description"
                            className="w-full"
                        />
                    </FormField>
                </div>
                {/* checkbox */}
                <div className="flex justify-center">
                    <Checkbox
                        id="is-active"
                        label="cost center"
                        checked={false}
                        size="small"
                    ></Checkbox>
                </div>
                <div className="sm:grid grid-cols-1 lg:grid-cols-3 gap-4 mx-auto max-w-5xl">
                    <FormField
                        label="Account Name"
                        id="account-name"
                        variant="block"
                        className="w-full"
                    >
                        <SelectDropdown
                            value="Account name"
                            onChange={(value) => console.log(value)}
                            placeholder="Select Account name"
                            className="w-full"
                            isSameKeyValue={false}
                            labelKey="label"
                            valueKey="value"
                            options={[
                                { label: "Account 1", value: "account-1" },
                                { label: "Account 2", value: "account-2" },
                                { label: "Account 3", value: "account-3" },
                            ]}
                        />
                    </FormField>
                    <FormField
                        label="Account Code"
                        id="account-code"
                        variant="block"
                    >
                        <SimpleInputBox
                            value={accountCode}
                            onChange={setAccountCode}
                            id="account-code"
                            placeholder="Type Account code"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Parent Account"
                        id="parent-account"
                        variant="block"
                    >
                        <SimpleInputBox
                            value={parentAccount}
                            onChange={setParentAccount}
                            id="parent-account"
                            placeholder="Type Parent Account"
                            className="w-full"
                        ></SimpleInputBox>
                    </FormField>
                </div>
            </Panel>
        </>
    );
};

export default ChartOfAccountsForm;
