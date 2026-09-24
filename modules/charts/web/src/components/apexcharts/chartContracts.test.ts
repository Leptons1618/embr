import { describe, expect, it } from 'vitest'

import { COMPONENT_TYPE, ApexChartsComponentMeta } from './ApexChartsComponent'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const schemaPath = resolve(
  process.cwd(),
  '../common/src/main/resources/schemas/components/embr.chart.apex-charts/props.json'
)

function readVariant(id: string) {
  return JSON.parse(
    readFileSync(
      resolve(
        process.cwd(),
        `../common/src/main/resources/schemas/components/embr.chart.apex-charts/variants/${id}.props.json`
      ),
      'utf8'
    )
  )
}

const typeSchema = JSON.parse(readFileSync(schemaPath, 'utf8')).$defs.chart_type

describe('modern ApexCharts contracts', () => {
  it('registers the component type expected by the JVM descriptor', () => {
    expect(COMPONENT_TYPE).toBe('embr.chart.apex-charts')
    expect(ApexChartsComponentMeta.getComponentType()).toBe(COMPONENT_TYPE)
  })

  it('keeps the expanded chart type set unique', () => {
    const types = [
      'funnel',
      'pyramid',
      'gauge',
      'dumbbell',
      'violin',
      'raincloud',
      'streamgraph',
      'waterfall',
      'histogram',
      'sunburst',
      'unit',
      'waffle',
    ] as const

    expect(types).toHaveLength(12)
    expect(types.filter((type, index) => types.indexOf(type) === index)).toHaveLength(12)
    expect(typeSchema.suggestions).toEqual(expect.arrayContaining(types))
    expect(readVariant('funnel').type).toBe('funnel')
    expect(readVariant('pie').type).toBe('pie')
    expect(readVariant('rangebar').type).toBe('rangeBar')
  })
})
