// This container displays the following
// 	- Graph title and the actual chart
// 	- Controls to resize the graph to
// 		- Fit tile area
// 		- Match Dashboard size
// 		- Full screen view
// 	- Also provides the sql query used to generate data for this graph

import React, { useEffect, useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import AreaChart from "../Charts/AreaChart";
import DoughnutChart from "../Charts/DoughnutChart";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import ScatterChart from "../Charts/ScatterChart";
import StackedBar from "../Charts/StackedBar";
import MultiBar from "../Charts/MultiBarChart";
import CrossTabChart from "../Charts/CrossTab/CrossTabChart";
import {
	setChartTitle,
	setGenerateTitle,
} from "../../redux/ChartProperties/actionsChartProperties";
import ChartThemes from "../ChartThemes/ChartThemes";
import CodeIcon from "@mui/icons-material/Code";
import BarChartIcon from "@mui/icons-material/BarChart";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CloseRounded from "@mui/icons-material/CloseRounded";
import FunnelChart from "../Charts/FunnelChart";
import GaugeChart from "../Charts/GaugeChart";
import HeatMap from "../Charts/HeatMap";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { toggleGraphSize } from "../../redux/TabTile/actionsTabTile";
import HorizontalBar from "../Charts/HorizontalBar";
import Horizontalstacked from "../Charts/Horizontalstacked";
import RoseChart from "../Charts/RoseChart";

const GraphArea = ({
	// state
	tileState,
	tabState,
	tabTileProps,
	chartProperties,
	chartControlState,

	// dispatch
	setChartTitle,
	setGenerateTitleToStore,
	toggleGraphSize,
}) => {
	var propKey = `${tabTileProps.selectedTabId}.${tabTileProps.selectedTileId}`;

	const [graphDimension, setGraphDimension] = useState({});
	const [graphDimension2, setGraphDimension2] = useState({});
	const [editTitle, setEditTitle] = useState(false);

	const [showSqlCode, setShowSqlCode] = useState(false);
	const [fullScreen, setFullScreen] = useState(false);

	const graphDimensionCompute = () => {
		if (tileState.tiles[propKey].graphSizeFull) {
			const height = document.getElementById("graphContainer").clientHeight;
			const width = document.getElementById("graphContainer").clientWidth;
			setGraphDimension({
				height,
				width,
			});
		} else {
			setGraphDimension({
				height:
					tabState.tabs[tabTileProps.selectedTabId].dashTilesDetails[propKey].height *
					tabTileProps.dashGridSize.y,
				width:
					tabState.tabs[tabTileProps.selectedTabId].dashTilesDetails[propKey].width *
					tabTileProps.dashGridSize.x,
			});
		}
	};

	const graphDimensionCompute2 = () => {
		const height = document.getElementById("graphFullScreen").clientHeight;
		const width = document.getElementById("graphFullScreen").clientWidth;
		setGraphDimension2({
			height,
			width,
		});
	};

	useLayoutEffect(() => {
		function updateSize() {
			graphDimensionCompute();
			if (fullScreen) graphDimensionCompute2();
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, [
		fullScreen,
		tabTileProps.showDataViewerBottom,
		tabTileProps.selectedControlMenu,
		tileState.tiles[propKey].graphSizeFull,
	]);

	const removeFullScreen = (e) => {
		//console.log(e.keyCode);
		if (e.keyCode === 27) {
			setFullScreen(false);
		}
	};

	const chartDisplayed = () => {
		switch (chartProperties.properties[propKey].chartType) {
			case "multibar":
				return (
					<MultiBar
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "stackedBar":
				return (
					<StackedBar
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "horizontalBar":
				return (
					<HorizontalBar
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "horizontalStacked":
				return (
					<Horizontalstacked
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "crossTab":
				return (
					<CrossTabChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "scatterPlot":
				return (
					<ScatterChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "area":
				return (
					<AreaChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "pie":
				return (
					<PieChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "donut":
				return (
					<DoughnutChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "rose":
				return (
					<RoseChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "line":
				return (
					<LineChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);
			case "funnel":
				return (
					<FunnelChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "gauge":
				return (
					<GaugeChart
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			case "heatmap":
				return (
					<HeatMap
						propKey={propKey}
						graphDimension={fullScreen ? graphDimension2 : graphDimension}
						graphTileSize={tileState.tiles[propKey].graphSizeFull}
					/>
				);

			default:
				return <h2>Work in progress</h2>;
		}
	};

	// ############################################
	// Setting title automatically
	// ############################################

	const graphTitle = () => {
		if (chartProperties.properties[propKey].titleOptions.generateTitle === "Auto") {
			const chartAxes = chartProperties.properties[propKey].chartAxes;

			var dims = [];
			var measures = [];

			// Compile dimensions and measures of different chart types in one format
			switch (chartProperties.properties[propKey].chartType) {
				case "crossTab":
				case "heatmap":
					dims = dims.concat(chartAxes[1].fields);
					dims = dims.concat(chartAxes[2].fields);
					measures = measures.concat(chartAxes[3].fields);
					break;

				case "scatterPlot":
					dims = dims.concat(chartAxes[1].fields);
					measures = measures.concat(chartAxes[2].fields);
					measures = measures.concat(chartAxes[3].fields);
					break;

				case "gauge":
				case "funnel":
					measures = measures.concat(chartAxes[1].fields);
					break;

				default:
					dims = dims.concat(chartAxes[1].fields);
					measures = measures.concat(chartAxes[2].fields);
					break;
			}

			var title = "";

			// Concatenate field names in dims / measures
			const concatenateFields = (fields) => {
				if (fields.length > 0) {
					var tempTitle = "";
					fields.forEach((element, index) => {
						if (index === 0) {
							var titlePart = element.fieldname;
							tempTitle = tempTitle + titlePart;
						}
						if (index > 0) {
							var titlePart = `, ${element.fieldname}`;
							tempTitle = tempTitle + titlePart;
						}
					});

					return tempTitle;
				}
			};

			var dimTitle = concatenateFields(dims);
			var measureTitle = concatenateFields(measures);

			if (
				chartProperties.properties[propKey].chartType === "gauge" ||
				chartProperties.properties[propKey].chartType === "funnel"
			) {
				title = measureTitle ? measureTitle : "";
			} else {
				title = measureTitle ? measureTitle : "";
				title = dimTitle ? title + ` by ${dimTitle}` : "";
			}

			title = title.charAt(0).toUpperCase() + title.slice(1);

			setChartTitle(propKey, title);
		}
	};

	useEffect(() => {
		graphTitle();
	}, [
		chartProperties.properties[propKey].chartAxes,
		chartProperties.properties[propKey].titleOptions.generateTitle,
	]);

	// ############################################
	// Manual title entry
	// ############################################

	const editTitleText = () => {
		// if (chartProperties.properties[propKey].generateTitle === "Manual") {
		setEditTitle(true);
		setGenerateTitleToStore(propKey, "Manual");
		// }
	};

	useEffect(() => {
		setTitleText(chartProperties.properties[propKey].titleOptions.chartTitle);
	}, [chartProperties.properties[propKey].titleOptions.chartTitle]);

	const [inputTitleText, setTitleText] = useState("");
	const handleTitleChange = (e) => {
		setTitleText(e.target.value);
	};

	const completeRename = () => {
		setChartTitle(propKey, inputTitleText);
		setEditTitle(false);
	};

	const ShowFormattedQuery = () => {
		var query = chartControlState.properties[propKey].chartData?.query;

		return (
			<SyntaxHighlighter
				className="syntaxHighlight"
				language="sql"
				style={a11yLight}
				showLineNumbers={true}
			>
				{query ? query : null}
			</SyntaxHighlighter>
		);
	};

	const RenderScreenOption = () => {
		return (
			<>
				<div
					className={
						!tileState.tiles[propKey].graphSizeFull
							? "graphAreaIconsSelected"
							: "graphAreaIcons"
					}
					title="Match Dashboard Size"
					style={
						tabState.tabs[tabTileProps.selectedTabId].tilesInDashboard.includes(propKey)
							? {}
							: { cursor: "not-allowed" }
					}
					onClick={() => {
						if (
							tabState.tabs[tabTileProps.selectedTabId].tilesInDashboard.includes(
								propKey
							)
						)
							toggleGraphSize(propKey, false);
					}}
				>
					<FullscreenExitIcon />
				</div>

				<div
					className={
						tileState.tiles[propKey].graphSizeFull
							? "graphAreaIconsSelected"
							: "graphAreaIcons"
					}
					title="Fit Tile Size"
					onClick={() => toggleGraphSize(propKey, true)}
				>
					<FullscreenIcon />
				</div>
			</>
		);
	};

	return (
		<div className="centerColumn">
			<div className="graphTitleAndEdit">
				{editTitle ? (
					<form
						style={{ width: "100%" }}
						onSubmit={(evt) => {
							evt.currentTarget.querySelector("input").blur();
							evt.preventDefault();
						}}
					>
						<input
							autoFocus
							style={{
								fontSize: chartProperties.properties[propKey].titleOptions.fontSize,

								textAlign:
									chartProperties.properties[propKey].titleOptions.titleAlign,
							}}
							type="text"
							className="editTitle"
							value={inputTitleText}
							onChange={handleTitleChange}
							onBlur={() => completeRename()}
						/>
					</form>
				) : (
					<>
						<div
							className="graphTitle"
							style={{
								fontSize: chartProperties.properties[propKey].titleOptions.fontSize,
								textAlign:
									chartProperties.properties[propKey].titleOptions.titleAlign,
								paddingLeft:
									chartProperties.properties[propKey].titleOptions
										.titleLeftPadding,
							}}
							onDoubleClick={() => editTitleText()}
							title="Double click to set title manually"
						>
							{chartProperties.properties[propKey].titleOptions.chartTitle}
						</div>
					</>
				)}

				{!showSqlCode ? (
					tabState.tabs[tabTileProps.selectedTabId].showDash ? null : (
						<>
							<RenderScreenOption />
							<div
								className="graphAreaIcons"
								onClick={() => setFullScreen(true)}
								title="Show full screen"
							>
								<OpenInFullIcon />
							</div>
						</>
					)
				) : null}
				<div
					style={{
						borderRight: "1px solid rgb(211,211,211)",
						margin: "6px 2px",
					}}
				></div>
				{showSqlCode ? (
					<div
						className="graphAreaIcons"
						onClick={() => setShowSqlCode(false)}
						title="View graph"
					>
						<BarChartIcon />
					</div>
				) : (
					<div
						className="graphAreaIcons"
						onClick={() => setShowSqlCode(true)}
						title="View SQL Code"
					>
						<CodeIcon />
					</div>
				)}
			</div>

			<div
				id="graphContainer"
				className="graphContainer"
				style={{ margin: tileState.tiles[propKey].graphSizeFull ? "0" : "1rem" }}
			>
				{showSqlCode ? <ShowFormattedQuery /> : chartDisplayed()}
			</div>
			<ChartThemes />
			{fullScreen ? (
				<div
					tabIndex="0"
					id="graphFullScreen"
					className="graphFullScreen"
					onKeyDown={(e) => {
						//console.log("Key pressed");
						removeFullScreen(e);
					}}
				>
					<div style={{ display: "flex" }}>
						<span
							className="graphTitle"
							style={{
								fontSize: chartProperties.properties[propKey].titleOptions.fontSize,
							}}
							onDoubleClick={() => editTitleText()}
						>
							{chartProperties.properties[propKey].titleOptions.chartTitle}
						</span>
						<CloseRounded
							style={{ margin: "0.25rem" }}
							onClick={() => setFullScreen(false)}
						/>
					</div>
					{chartDisplayed()}
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		tileState: state.tileState,
		tabState: state.tabState,
		tabTileProps: state.tabTileProps,
		chartControlState: state.chartControls,
		chartProperties: state.chartProperties,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setChartTitle: (propKey, title) => dispatch(setChartTitle(propKey, title)),
		setGenerateTitleToStore: (propKey, option) => dispatch(setGenerateTitle(propKey, option)),
		toggleGraphSize: (tileKey, graphSize) => dispatch(toggleGraphSize(tileKey, graphSize)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GraphArea);
