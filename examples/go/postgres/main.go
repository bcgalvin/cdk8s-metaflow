package main

import (
	"github.com/aws/constructs-go/constructs/v10"
	"github.com/aws/jsii-runtime-go"
	"github.com/bcgalvin/cdk8s-metaflow-go/cdk8smetaflow"
	"github.com/cdk8s-team/cdk8s-core-go/cdk8s/v2"
)

type MetaflowChartProps struct {
	cdk8s.ChartProps
}

func NewMetaflowChart(scope constructs.Construct, id string, props *MetaflowChartProps) cdk8s.Chart {
	var cprops cdk8s.ChartProps
	if props != nil {
		cprops = props.ChartProps
	}
	chart := cdk8s.NewChart(scope, jsii.String(id), &cprops)

	cdk8smetaflow.NewMetaflowService(chart, jsii.String("metaflow"),
		&cdk8smetaflow.MetaflowServiceProps{
			PostgresEnabled: jsii.Bool(true),
			IngressEnabled:  jsii.Bool(true),
		})

	return chart
}

func main() {
	app := cdk8s.NewApp(nil)
	NewMetaflowChart(app, "postgres", nil)
	app.Synth()
}
