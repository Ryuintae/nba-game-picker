"use client";

import { useEffect, useId, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";
import type { RecentGameResult } from "@/features/nba/types/home";

type FormFlowChartProps = {
    awayTeam: string;
    homeTeam: string;
    awayResults: RecentGameResult[];
    homeResults: RecentGameResult[];
};

type ChartDatum = {
    game: string;
    away: number;
    home: number;
    awayResult: string;
    homeResult: string;
};

function getShortName(team: string) {
    const parts = team.split(" ");
    return parts.at(-1) ?? team;
}

function getChartValue(result: RecentGameResult | undefined) {
    if (!result) {
        return 50;
    }

    return result.result === "W" ? 82 : 28;
}

function getChartData(
    awayResults: RecentGameResult[],
    homeResults: RecentGameResult[]
): ChartDatum[] {
    const maxLength = Math.max(awayResults.length, homeResults.length, 1);
    const length = Math.min(Math.max(maxLength, 3), 5);

    return Array.from({ length }, (_, index) => {
        const awayResult = awayResults[index];
        const homeResult = homeResults[index];

        return {
            game: `${index + 1}`,
            away: getChartValue(awayResult),
            home: getChartValue(homeResult),
            awayResult: awayResult?.result ?? "-",
            homeResult: homeResult?.result ?? "-",
        };
    });
}

export default function FormFlowChart({
    awayTeam,
    homeTeam,
    awayResults,
    homeResults,
}: FormFlowChartProps) {
    const chartId = useId().replaceAll(":", "-");
    const chartData = useMemo(
        () => getChartData(awayResults, homeResults),
        [awayResults, homeResults]
    );
    const awayShortName = getShortName(awayTeam);
    const homeShortName = getShortName(homeTeam);

    useEffect(() => {
        const root = am5.Root.new(chartId);
        root.setThemes([am5themesAnimated.new(root)]);

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                paddingLeft: 0,
                paddingRight: 8,
                paddingTop: 8,
                paddingBottom: 0,
            })
        );

        const xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 34,
        });
        xRenderer.grid.template.setAll({
            strokeOpacity: 0.08,
        });
        xRenderer.labels.template.setAll({
            fill: am5.color(0x9ca3af),
            fontSize: 10,
        });

        const xAxis = chart.xAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "game",
                renderer: xRenderer,
            })
        );
        xAxis.data.setAll(chartData);

        const yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.setAll({
            strokeOpacity: 0.08,
        });
        yRenderer.labels.template.setAll({
            forceHidden: true,
        });

        const yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                max: 100,
                strictMinMax: true,
                renderer: yRenderer,
            })
        );

        function createSeries(
            name: string,
            field: "away" | "home",
            resultField: "awayResult" | "homeResult",
            color: number
        ) {
            const series = chart.series.push(
                am5xy.SmoothedXLineSeries.new(root, {
                    name,
                    xAxis,
                    yAxis,
                    categoryXField: "game",
                    valueYField: field,
                    tension: 0.45,
                    stroke: am5.color(color),
                    fill: am5.color(color),
                })
            );

            series.strokes.template.setAll({
                strokeWidth: 3,
            });
            series.fills.template.setAll({
                fillOpacity: 0.08,
                visible: true,
            });
            series.bullets.push(() =>
                am5.Bullet.new(root, {
                    sprite: am5.Label.new(root, {
                        text: `{${resultField}}`,
                        centerX: am5.p50,
                        centerY: am5.p50,
                        width: 22,
                        height: 22,
                        populateText: true,
                        textAlign: "center",
                        fontSize: 10,
                        fontWeight: "700",
                        fill: am5.color(0xffffff),
                        background: am5.RoundedRectangle.new(root, {
                            fill: am5.color(color),
                            cornerRadiusBL: 3,
                            cornerRadiusBR: 3,
                            cornerRadiusTL: 3,
                            cornerRadiusTR: 3,
                        }),
                    }),
                })
            );
            series.data.setAll(chartData);
            series.appear(500);
        }

        createSeries(awayShortName, "away", "awayResult", 0x1d428a);
        createSeries(homeShortName, "home", "homeResult", 0xf97316);
        chart.appear(500, 80);

        return () => {
            root.dispose();
        };
    }, [awayShortName, chartData, chartId, homeShortName]);

    return (
        <div className="mt-4 border-y border-black/8 py-4 dark:border-white/10">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[11px] font-semibold text-neutral-950 dark:text-white">
                        최근 흐름 차트
                    </p>
                    <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                        W/L 결과를 경기 순서대로 연결
                    </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-[#1d428a]" />
                        {awayShortName}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 bg-orange-500" />
                        {homeShortName}
                    </span>
                </div>
            </div>

            <div className="mt-3 border border-black/8 bg-white dark:border-white/10 dark:bg-black/12">
                <div id={chartId} className="h-[174px] w-full" />
            </div>
        </div>
    );
}
