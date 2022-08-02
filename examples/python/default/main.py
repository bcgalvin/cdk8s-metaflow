#!/usr/bin/env python
from constructs import Construct
from cdk8s import App, Chart
from cdk8s_metaflow import MetaflowService


class MetaflowServiceChart(Chart):
    def __init__(self, scope: Construct, id: str):
        super().__init__(scope, id)

        MetaflowService(self, "metaflow")


app = App()
MetaflowServiceChart(app, "default")

app.synth()
