import { useEffect, useState } from "react";
import DynamicGridLayout, { GridItem } from "../../../../components/layout/DynamicGridLayout";
import { Layout } from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/store";
import DashboardComponentRegistry from './DashboardComponentRegistry';
import Switcher from "../../../../components/form/Switcher";
import Modal from "../../../../components/feedback-interaction/Modal";
import SelectDropdown from "../../../../components/form/SelectDropdown";
import { accountChartComponentKeys, DashboardConfig, DashboardItem } from "../../../../types/global";
import Button from "../../../../components/form/Button";
import FeatherIcon from "../../../../components/FeatherIcon";
import { PlusCircle } from "react-feather";

const AccountsGraphDashboard = () => {

  const dispatch: AppDispatch = useDispatch();
  const dashboardConfig = useSelector((state: RootState) => state.accountDashboard.config);

  const defaultDashboardConfig: DashboardConfig = {
    id: 0,
    user_id: 1,
    name: "Default Dashboard",
    is_default: true,
    items: []
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widget, setWidget] = useState<string>("");

  useEffect(() => {
    document.title = "Procurement Dashboard";
    // dispatch(fetchAccountsDasboardConfig())
    // Optionally return a cleanup function if needed
    return () => {
      // Reset title or do other cleanup if needed
      document.title = "";
    };
  }, [dispatch]);

  useEffect(() => {

    const items = dashboardConfig.items.map((item) => {
      const Component = DashboardComponentRegistry[item.component_name];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let parsedConfig: any = {};
      try {
        parsedConfig = JSON.parse(item.config);
      } catch (e) {
        console.error("Invalid JSON in config:", item.config);
      }

      return {
        id: item.id.toString(),
        title: item.component_name,
        content: Component ? <Component config={parsedConfig} /> : <div>Component not found</div>,
        w: item.w,
        h: item.h,
        x: item.x,
        y: item.y
      };
    });

    setGridItems(items);
  }, [dashboardConfig]);

  const [gridItems, setGridItems] = useState<GridItem[]>([]);

  const handleOnResizeChange = (layout: Layout[], newItem: Layout) => {
    // console.log('Resize changed:', layout, newItem);
    // Save to localStorage or API
    //  dispatch(updateDashboardConfig(updatedConfig));
  };

  const updateItemsFromLayout = (layout: Layout[], config: DashboardConfig): DashboardItem[] => {
    return config.items.map((item) => {
      const matchedLayout = layout.find((l) => Number(l.i) === item.id);
      if (matchedLayout) {
        return {
          ...item,
          x: matchedLayout.x,
          y: matchedLayout.y,
          w: matchedLayout.w,
          h: matchedLayout.h,
        };
      }
      return item;
    });
  };

  const handleLayoutChange = (layout: Layout[]) => {
    console.log('handleLayoutChange changed:', layout);

    // Optionally update config here if you want on every change
    const configToUse = dashboardConfig || defaultDashboardConfig;
    const updatedItems = updateItemsFromLayout(layout, configToUse);
    // dispatch(updateAccountsDashboardConfig({ ...configToUse, items: updatedItems }));
  };

  const handleOnResizeStop = (layout: Layout[], newItem: Layout) => {
    console.log('handleOnResizeStop changed:', layout);

    const configToUse = dashboardConfig || defaultDashboardConfig;
    const updatedItems = updateItemsFromLayout(layout, configToUse);

    const updatedConfig: DashboardConfig = {
      ...configToUse,
      items: updatedItems,
    };

    // dispatch(updateAccountsDashboardConfig(updatedConfig));
  };



  const closeModal = () => setIsModalOpen(false);

  const handleAddWidget = () => {
    // If dashboardConfig is falsy, use defaultDashboardConfig instead
    const configToUse = dashboardConfig || defaultDashboardConfig;

    // Now you can update configToUse safely
    // For example, add a new widget to items
    const newWidget: DashboardItem = {
      id: Date.now(), // or some unique id generator
      dashboard_config_id: configToUse.id,
      component_name: widget,
      x: 0,
      y: 0,
      w: 4,
      h: 3,
      config: "{}",
    };

    const updatedConfig = {
      ...configToUse,
      items: [...configToUse.items, newWidget],
    };

    // Dispatch the update to Redux store
    // dispatch(updateAccountsDashboardConfig(updatedConfig));
  };

  const deleteDashboardItem = async (itemId: number) => {

    const configToUse = dashboardConfig || defaultDashboardConfig;

    const updatedItems = configToUse.items.filter(item => item.id !== itemId);
    const updatedDashboard = { ...configToUse, items: updatedItems };

    // dispatch(updateAccountsDashboardConfig(updatedDashboard));
  };

  return (
    <div className="p-0  bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-700 dark:text-gray-200">Edit Mode</span>
            <Switcher checked={isEditMode} onChange={setIsEditMode} size="small" color="green" />
            {/* Show Button only if Edit Mode is On */}
            {isEditMode && (
              <div className="">
                <Button
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Add Widget
                </Button>
              </div>
            )}
          </div>
        </div>

        {
          gridItems.length > 0 &&
          <DynamicGridLayout
            items={gridItems}
            onLayoutChange={handleLayoutChange}
            onResize={handleOnResizeChange}
            onDelete={deleteDashboardItem}
            onResizeStop={handleOnResizeStop}
            editable={isEditMode}
          />
        }


      </div>

      {/* Custom Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        widthClass="max-w-md"
        title="Add Widget for TNA Dashboard"
        heightClass="h-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Single column grid with gap between rows */}

          <div>
            <SelectDropdown
              options={accountChartComponentKeys}
              value={widget}
              isSameKeyValue={true}
              onChange={(val) => setWidget(val)}
              className="h-8 text-sm w-full"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleAddWidget} size="sm" className="">
              <FeatherIcon icon={PlusCircle} /> Add
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default AccountsGraphDashboard;
