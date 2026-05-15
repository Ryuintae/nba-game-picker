"use client";

import { useEffect, useId } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";

am5.addLicense("AM5C367437821");

export type ScoreBreakdownDatum = {
    label: string;
    score: number;
    maxScore: number;
    color: string;
};

type ScoreBreakdownChartProps = {
    data: ScoreBreakdownDatum[];
    totalScore: number;
};

export default function ScoreBreakdownChart({
    data,
    totalScore,
}: ScoreBreakdownChartProps) {
    const chartId = useId().replaceAll(":", "-");

    useEffect(() => {
        const root = am5.Root.new(chartId);
        root.setThemes([am5themesAnimated.new(root)]);

        const chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                innerRadius: am5.percent(68),
                layout: root.verticalLayout,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
            })
        );

        const series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "score",
                categoryField: "label",
                alignLabels: false,
            })
        );

        series.slices.template.setAll({
            strokeOpacity: 0,
            cornerRadius: 5,
            tooltipText: "{category}: {value}점",
        });
        series.labels.template.set("forceHidden", true);
        series.ticks.template.set("forceHidden", true);

        series
            .get("colors")
            ?.set(
                "colors",
                data.map((item) => am5.color(item.color))
            );
        series.data.setAll(data);

        chart.seriesContainer.children.push(
            am5.Label.new(root, {
                text: `${totalScore}`,
                centerX: am5.p50,
                centerY: am5.p50,
                fontSize: 42,
                fontWeight: "700",
                fill: am5.color(0xffffff),
            })
        );
        chart.seriesContainer.children.push(
            am5.Label.new(root, {
                text: "/ 100",
                centerX: am5.p50,
                centerY: am5.percent(67),
                fontSize: 12,
                fontWeight: "600",
                fill: am5.color(0x9ca3af),
            })
        );

        series.appear(500, 80);
        chart.appear(500, 80);

        return () => {
            root.dispose();
        };
    }, [chartId, data, totalScore]);

    return <div id={chartId} className="h-[260px] w-full" />;
}
