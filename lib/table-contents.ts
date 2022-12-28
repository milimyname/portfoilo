import { toc } from "mdast-util-toc"
import { visit } from "unist-util-visit"
import { remark } from "remark"
import type { TocItems, TableOfContentsProps } from "types"

const textTypes = [
  "text",
  "inlineCode",
  "strong",
  "emphasis",
  "delete",
  "link",
  "image",
]

// Flatten node to get text
const flattenNode = (node: any) => {
  const arrNodes = []
  visit(node, (node) => {
    if (textTypes.includes(node.type)) arrNodes.push(node.value)
  })
  return arrNodes.join("")
}

// Go through the table of contents and get the items
const getItems = (node: any, current: any): TocItems => {
  if (!node) return {}

  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = flattenNode(node)
      }

      if (item.type === "text") {
        current.title = flattenNode(item)
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((item: any) => getItems(item, {}))

    return current
  } else if (node.type === "listItem") {
    const heading = getItems(node.children[0], {})

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return {}
}

// Get the table of contents
const getToc = () => (node, file) => {
  const table = toc(node)
  file.data = getItems(table.map, {})
}

export async function getTableOfContents(
  content: string
): Promise<TableOfContentsProps> {
  const result = await remark().use(getToc).process(content)
  return result.data
}
