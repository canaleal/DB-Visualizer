import { toJpeg, toPng, toSvg } from 'html-to-image';
import { useState } from 'react';
import { Panel, getRectOfNodes, getTransformForBounds, useReactFlow } from 'reactflow';

import { IconDownload } from '@tabler/icons-react';

const imageWidth = 1920;
const imageHeight = 1080;

function DownloadButton() {

    const imageFormats = ['png', 'svg', 'jpg'];
    const [selectedImageFormat, setSelectedImageFormat] = useState(imageFormats[0]);

    function downloadImage(dataUrl: string) {
        if (!dataUrl || !selectedImageFormat) return;
        const a = document.createElement('a');
        const imagePath = `reactflow.${selectedImageFormat}`
        a.setAttribute('download', imagePath);
        a.setAttribute('href', dataUrl);
        a.click();
    }


    const { getNodes } = useReactFlow();
    const onDownload = () => {
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
        const react_flow_viewport = document.querySelector('.react-flow__viewport');
        if (!react_flow_viewport) return;

        const config = {
            width: imageWidth,
            height: imageHeight,
            style: {
                width: imageWidth.toString(),
                height: imageHeight.toString(),
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }

        if (selectedImageFormat === 'png') {
            toPng(react_flow_viewport as HTMLElement, {
                backgroundColor: '#FFFFFF',
                ...config
            }).then(downloadImage);
        } else if (selectedImageFormat === 'svg') {
            toSvg(react_flow_viewport as HTMLElement, {
                ...config
            }).then(downloadImage);
        } else if (selectedImageFormat === 'jpg') {
            toJpeg(react_flow_viewport as HTMLElement, {
                backgroundColor: '#FFFFFF',
                ...config
            }).then(downloadImage);
        }
    };

    return (
        <Panel position="top-right" className='flex flex-row gap-2'>
            <select
                className='bg-zinc-900 hover:bg-zinc-800 p-2 text-white rounded-md'
                value={selectedImageFormat}
                onChange={(e) => setSelectedImageFormat(e.target.value)}
            >
                {imageFormats.map((format) => (
                    <option key={format} value={format}>
                        {format}
                    </option>
                ))}
            </select>

            <button className="bg-indigo-900 hover:bg-indigo-800 p-2 text-white rounded-md" onClick={onDownload}>
                <IconDownload stroke='white' size={20} strokeWidth={2} />
            </button>

        </Panel>
    );
}

export default DownloadButton;
