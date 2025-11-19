import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { faBackward, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { addCountry, clearCountryMessages, clearCountryState, editCountry, getCountry, getPagedCountries, setCountryValidationErrors, updateCountryField } from "../../reduxSlices/country.Slice";
import { countrySchema, CountryValidationErrors, ICountry } from "./country.interface";



const CountryList = () => {

    const { id } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const { countries, country, error, message, validationErrors, loading, paginationObject } = useSelector((state: RootState) => state.country);
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
    const [pageTitle, setPageTitle] = useState<string>("");
    const { rowsPerPage, layout, company } = useTheme();
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearCountryMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearCountryMessages());
        }
    }, [message]);

    useEffect(() => {

        document.title = "Country Setup";
        console.log("Country Form mounted");
        setPageTitle("Country List Demo");
        // dispatch(fetchAllProductionType());
        return () => {
            document.title = "";
            dispatch(clearCountryState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            document.title = "Country Edit";
            setPageTitle("Country List Demo");
            setIsUpdateMode(true);
            dispatch(getCountry(Number(id)))
        }
    }, [id]);

    const handleChange = (key: keyof ICountry, value: string, displayValue?: string) => {
        dispatch(
            updateCountryField({
                key: key,
                value: value,
            })
        );
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(webRoutes.COUNTRY_LIST);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const parseResult = countrySchema.safeParse(countries);

        if (!parseResult.success) {
            const errors: CountryValidationErrors = {};
            for (const issue of parseResult.error.issues) {
                const key = issue.path[0] as keyof ICountry;
                errors[key] = issue.message;
            }
            dispatch(setCountryValidationErrors(errors));
            return;
        }
        if (isUpdateMode) {
            dispatch(editCountry({ id: Number(id), payload: country }));
        } else {
            dispatch(addCountry(country));
        }
    };



    const countryColumns: Column<ICountry>[] = [
        { key: "id", header: "ID", width: "w-16", align: "center" },
        { key: "countryName", header: "Country Name", width: "w-48" },
        { key: "countryCode", header: "Code", width: "w-24", align: "center" },
    ];



    type Country = {
        id: number;
        countryName: string;
        countryCode: string;
    };

    return (
        <>
            <Panel
                header={
                    <PageHeader
                        title={pageTitle}
                        buttonLabel="New Country"
                        buttonHref={webRoutes.COUNTRY_SAVE}
                    />
                }
                footer={
                    <div className="flex items-center justify-between p-2 border-b border-gray-200">
                        <Button
                            onClick={handleSubmit}
                            size="sm"
                            className="px-4 py-2 text-white bg-[#1F7BC9] rounded hover:bg-[#439DDF]">
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
                <div>
                    <CustomDataTable
                        columns={countryColumns}
                        data={countries}
                        bordered
                        columnsButton
                        perPageDropdown
                        loading={loading}
                        paginationObject={paginationObject}
                        onPageChange={(page) =>
                            dispatch(getPagedCountries({ page, perPage: paginationObject.perPage }))
                        }
                        onPerPageChange={(perPage) =>
                            dispatch(getPagedCountries({ page: 1, perPage }))
                        }
                    />
                </div>

                {/* <div className="p-4">
                    <h1 className="text-lg font-semibold mb-4">Countries (From JSON)</h1>
                    <CustomDataTable
                        columns={countryColumns}
                        data={countriesJson.map((country, idx) => ({
                            ...country,
                            id: idx + 1,
                        }))}
                        bordered
                        columnsButton
                    />
                </div> */}
            </Panel>
        </>
    );
};

export default CountryList;
