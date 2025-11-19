import useApiUrl from '@/hooks/use-ApiUrl';
import React from 'react'
type props = {
    styleId: number
}
export default function StyleImage({ styleId }: props) {
    const [imageSrc, setImageSrc] = React.useState<string>();
    const api = useApiUrl();

    React.useEffect(() => {
        console.log('styleid', styleId);
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `${api.ProductionUrl}/production/Style/GetStyleImage?styleId=${styleId}`
                );
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageSrc(url);
                } else {
                    console.error("Failed to fetch image");
                }
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        fetchImage();
    }, [api.ProductionUrl, styleId]);

    return (
        <img
            src={imageSrc}
            alt="image"
            className="w-full h-auto max-h-full object-contain"
        />
    )
}
