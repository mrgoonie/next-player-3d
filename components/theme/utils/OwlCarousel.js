import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { TOptionsEvents } from "keen-slider";

/**
 * @param  {Object} props
 * @param  {TOptionsEvents} props.options
 */
const OwlCarousel = ({
	children,
	options = {
		slidesPerView: 4,
		spacing: 15,
		centered: true,
		loop: true,
	},
	autoPlay = false,
	className = "",
	...rest
}) => {
	const timer = React.useRef();
	const [pause, setPause] = React.useState(false);

	const [sliderRef, slider] = useKeenSlider({
		...options,
		dragStart: () => {
			setPause(true);
		},
		dragEnd: () => {
			setPause(false);
		},
	});

	const orgChildren = children && children.type == React.Fragment ? children.props.children : children;
	const childrenWithProps = React.Children.map(orgChildren, (child, index) => {
		if (React.isValidElement(child)) {
			let newProps = { ...child.props };
			if (!newProps.className) newProps.className = "";
			newProps.className += " keen-slider__slide";
			return React.cloneElement(child, newProps);
		}
		return child;
	});

	React.useEffect(() => {
		if (autoPlay) {
			timer.current = setInterval(
				() => {
					if (!pause && slider) {
						slider.next();
					}
				},
				autoPlay == true ? 3000 : autoPlay
			);
		}
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [pause, slider]);

	return (
		<div {...rest} ref={sliderRef} className={`keen-slider ${className}`}>
			{childrenWithProps}
		</div>
	);
};

export default OwlCarousel;
