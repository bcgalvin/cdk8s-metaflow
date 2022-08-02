#!/usr/bin/env python
from constructs import Construct
from cdk8s import App, Chart
from cdk8s_metaflow import MetaflowService


class MetaflowServiceChart(Chart):
	def __init__(self, scope: Construct, id: str):
		super().__init__(scope, id)
		
		MetaflowService(self, "metaflow", postgres_enabled=True, ingress_enabled=True)


app = App()
MetaflowServiceChart(app, "postgres")

app.synth()
