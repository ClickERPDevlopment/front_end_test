import CircleRadio from "@/components/form/CircleRadio";
import Switcher from "@/components/form/Switcher";
import { useTheme } from "@/hooks/useTheme";

const ThemeColor: React.FC = () => {
    const { themeName, setThemeName, hasInputControlColor, setHasInputControlColor } = useTheme();
    return (
        <>
            {/* Theme Color rr */}
            <div className="pt-2">
                <label className="block ">Theme Colors</label>
                <div className="flex space-x-4 p-4">
                    <CircleRadio
                        name="theme_color"
                        value="default"
                        checked={themeName === "default"}
                        onChange={() => setThemeName("default")}
                        color="white"
                        className="bg-gradient-to-r from-slate-900 to-slate-50"
                        tooltip="Default"
                    />
                    {/* <CircleRadio
                        name="theme_color"
                        value="green"
                        checked={themeName === "green"}
                        onChange={() => setThemeName("green")}
                        color="green"
                        className="bg-green-600"
                        tooltip="Green"
                    />
                    <CircleRadio
                        name="theme_color"
                        value="purple"
                        checked={themeName === "purple"}
                        onChange={() => setThemeName("purple")}
                        color="purple"
                        className="bg-purple-600"
                        tooltip="Purple Theme"
                    />
                    <CircleRadio
                        name="theme_color"
                        value="gradient"
                        checked={themeName === "blue"}
                        onChange={() => setThemeName("blue")}
                        color="blue"
                        className="bg-blue-600"
                        tooltip="Blue Theme"
                    /> */}

                </div>
            </div>

            {/* Input Control Color */}
            <div>
                <label className="block ">Input Control Color</label>
                <div className="flex space-x-4 p-4">
                    <Switcher
                        checked={hasInputControlColor}
                        onChange={setHasInputControlColor} size="small" color="green" />

                </div>
            </div>
        </>
    );
};

export default ThemeColor;
