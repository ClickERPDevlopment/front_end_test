// Redux store configuration and setup
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Reducers
import menuReducer from '../modules/configurations/reduxSlices/menuSlice';
import menuToggleReducer from '../modules/configurations/reduxSlices/menuToggleSlice';
import moduleReducer from '../modules/configurations/reduxSlices/moduleSlice';
import gmtPurchaseOrderReducer from '../modules/garmentsProduction/reduxSlices/gmtPurchaseOrderSlice';
import styleReducer from '../modules/garmentsProduction/reduxSlices/styleSlice';
import configStyleReducer from '../modules/merchandising/reduxSlices/configStyle.Slice';
import purchaseOrderReducer from '../modules/merchandising/reduxSlices/purchaseOrderSlice';
import authReducer from '../redux/authSlice';
import appReducer from './appSlice';
import dropdownReducer from './dropdownSlice';

//production
import productionDashboardReducer from '../modules/garmentsProduction/reduxSlices/productionDashboardSlice';

//accounts
import accountDashboardReducer from '../modules/accounts/reduxSlices/accountsDashboardSlice';
import businessUnitReducer from '../modules/accounts/reduxSlices/businessUnitSlice';
import chartOfAccountReducer from '../modules/accounts/reduxSlices/chartOfAccountSlice';
import costCenterReducer from '../modules/accounts/reduxSlices/costCenterSlice';
import projectReducer from '../modules/accounts/reduxSlices/projectSlice';
import voucherReducer from '../modules/accounts/reduxSlices/voucherSlice';
import voucherTypeReducer from '../modules/accounts/reduxSlices/voucherTypeSlice';

//planning
import tnaDashboardReducer from '../modules/planning/reduxSlices/tnaDashboardSlice';
import tnaReducer from '../modules/planning/reduxSlices/tnaSlice';
import tnaTaskGroupReducer from '../modules/planning/reduxSlices/tnaTaskGroupSlice';
import tnaTaskReducer from '../modules/planning/reduxSlices/tnaTaskSlice';
import tnaTeamReducer from '../modules/planning/reduxSlices/tnaTeamSlice';
import tnaTemplateReducer from '../modules/planning/reduxSlices/tnaTemplateSlice';

//configurations
import currencyReducer from '../modules/accounts/reduxSlices/currencySlice';
import companyReducer from '../modules/configurations/reduxSlices/companySlice';
import userGroupReducer from '../modules/configurations/reduxSlices/userGroup.slice';
import departmentReducer from '../modules/configurations/reduxSlices/department.Slice';
import designationReducer from '../modules/configurations/reduxSlices/designation.Slice';
import factoryWiseMenuPermissionReducer from "../modules/configurations/reduxSlices/factoryWiseMenuPermission.Slice";
import floorReducer from '../modules/configurations/reduxSlices/floorSlice';
import lineReducer from '../modules/configurations/reduxSlices/lineSlice';
import sectionReducer from '../modules/configurations/reduxSlices/sectionSlice';
import userWiseMenuPermissionReducer from '../modules/configurations/reduxSlices/userWiseMenuPermission.slice';
import secUserReducer from '../modules/configurations/reduxSlices/secUser.Slice';

//inventory
import inventorySaleReducer from '../modules/inventory/reduxSlices/inventorySale.slice';
import materialGroupReducer from '../modules/inventory/reduxSlices/materialgroup.Slice';
import materialReducer from '../modules/inventory/reduxSlices/materialInfo.Slice';
import materialSubGroupReducer from '../modules/inventory/reduxSlices/materialsubgroupSlice';
import storeReducer from '../modules/inventory/reduxSlices/store.Slice';
import storeGroupReducer from '../modules/inventory/reduxSlices/storeGroup.Slice';
import uomReducer from '../modules/inventory/reduxSlices/uom.Slice';

//ie tools
import machinesSetupReducer from '../modules/iE/reduxSlices/machine.Slice';
import operationReducer from '../modules/iE/reduxSlices/operationSlice';
import operationTypeReducer from '../modules/iE/reduxSlices/operationTypeSlice';

//quality
import defectRejectReducer from "../modules/quality/reduxSlices/defectRejectType.Slice";

//procurement
import gatePassReducer from "../modules/procurement/reduxSlices/gatePassSlice";
import poReleaseReducer from '../modules/procurement/reduxSlices/poRelease.slice';
import purchaseRequisitonReducer from "../modules/procurement/reduxSlices/purchaseRequisition.Slice";
import purchaseRequisitonDetailsReducer from "../modules/procurement/reduxSlices/purchaseRequisitionDetails.Slice";
import purchaseRequisitonHistoryReducer from "../modules/procurement/reduxSlices/purchaseRequisitionHistory.Slice";
import purchaseRequisitonStatusReducer from "../modules/procurement/reduxSlices/purchaseRequisitionStatus.Slice";
import supplierReducer from '../modules/procurement/reduxSlices/supplierSlice';

// planning
import planningCalendarReducer from "../modules/planning/reduxSlices/planningCalendar.Slice";
import planningWorkingTeamReducer from "../modules/planning/reduxSlices/planningWorkingTeam.Slice";

// Middleware
import { authMiddleware } from './middleware/authMiddleware';
import loadingMiddleware from './middleware/loadingMiddleware';

//reports
import tnaReportReducer from "../modules/reports/reduxSlices/tnaReportSlice";

// commercial
import countryReducer from "../modules/commercial/reduxSlices/country.Slice";

// merchandising
import buyerReducer from "../modules/merchandising/reduxSlices/buyer.Slice";
import colorReducer from "../modules/merchandising/reduxSlices/color.Slice";
import sizeReducer from "../modules/merchandising/reduxSlices/size.Slice";

// print embroidery
import printEmbReducer from '../modules/printingEmbroidery/reduxSlices/printEmbMaterialReceive.slice';

// management
import budgetReducer from '../modules/management/reduxSlices/budget.Slice';



// Configure store with reducers and middleware
const store = configureStore({
    reducer: {
        app: appReducer,
        dropdown: dropdownReducer,
        auth: authReducer,
        floorRND: floorReducer,
        menuToggle: menuToggleReducer,
        menu: menuReducer,
        module: moduleReducer,
        gmtPurchaseOrder: gmtPurchaseOrderReducer,

        // size: sizeReducer,
        style: styleReducer,
        configStyle: configStyleReducer,
        purchaseOrder: purchaseOrderReducer,
        uom: uomReducer,
        tna: tnaReducer,
        tnaTaskGroup: tnaTaskGroupReducer,
        tnaTask: tnaTaskReducer,
        tnaTemplate: tnaTemplateReducer,
        tnaTeam: tnaTeamReducer,
        tnaDashboard: tnaDashboardReducer,
        accountDashboard: accountDashboardReducer,
        productionDashboard: productionDashboardReducer,
        chartOfAccount: chartOfAccountReducer,
        voucherType: voucherTypeReducer,
        businessUnit: businessUnitReducer,
        voucher: voucherReducer,
        project: projectReducer,
        costCenter: costCenterReducer,

        //configurations
        currency: currencyReducer,
        floor: floorReducer,
        section: sectionReducer,
        line: lineReducer,
        company: companyReducer,
        userGroup: userGroupReducer,
        department: departmentReducer,
        designation: designationReducer,
        userWiseMenuPermission: userWiseMenuPermissionReducer,
        secUser: secUserReducer,

        //inventory
        materialSubGroup: materialSubGroupReducer,
        materialGroup: materialGroupReducer,
        material: materialReducer,
        store: storeReducer,
        storeGroup: storeGroupReducer,
        inventorySale: inventorySaleReducer,

        //ie tools
        machine: machinesSetupReducer,
        operationType: operationTypeReducer,
        operation: operationReducer,

        //quality
        defectReject: defectRejectReducer,

        //procurement
        gatePass: gatePassReducer,
        purchaseRequisition: purchaseRequisitonReducer,
        purchaseRequisitionStatus: purchaseRequisitonStatusReducer,
        purchaseRequisitionDetails: purchaseRequisitonDetailsReducer,
        purchaseRequisitionHistory: purchaseRequisitonHistoryReducer,
        supplier: supplierReducer,
        poRelease: poReleaseReducer,
        //planning
        planningWorkingTeam: planningWorkingTeamReducer,
        planningCalendar: planningCalendarReducer,

        //report
        tnaReport: tnaReportReducer,

        // commercial
        country: countryReducer,

        // merchandising
        buyer: buyerReducer,
        color: colorReducer,
        size: sizeReducer,

        // configuration
        factoryWiseMenuPermission: factoryWiseMenuPermissionReducer,

        // print embroidery
        printEmbMaterialReceive: printEmbReducer,

        // management
        budget: budgetReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loadingMiddleware, authMiddleware),
});
// Types inferred from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Custom hook for dispatch with types
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
