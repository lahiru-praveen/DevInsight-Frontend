import { useRef } from "react";
import PropTypes from "prop-types";

const ToolTip = ({ children, tooltip }) => {
    const tooltipRef = useRef(null);
    const container = useRef(null);

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                tooltipRef.current.style.left = clientX - left + "px";
                tooltipRef.current.style.zIndex = "999"; // Set a high z-index value
            }}
            className="group relative inline-block"
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-200 text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap"
                    style={{
                        zIndex: "1000",
                    }}
                >
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
};

ToolTip.propTypes = {
    children: PropTypes.node.isRequired,
    tooltip: PropTypes.string
};

export default ToolTip;
