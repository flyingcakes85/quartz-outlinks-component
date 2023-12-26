import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/outlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"

function Outlinks({ fileData, allFiles, displayClass }: QuartzComponentProps) {
  const slug = simplifySlug(fileData.slug!)
  const o = fileData.links?? []

  const links = []
  for (var i = 0; i < o.length; i++) {
    for (var j = 0; j < allFiles.length; j++){
        if (o[i] == simplifySlug(allFiles[j].slug!)) {
            links.push(allFiles[j])
            break
        }
    }
  }
  return (
    <div class={`outlinks ${displayClass ?? ""}`}>
      <h3>Outlinks</h3>
      <ul class="overflow">
        {links.length > 0 ? (
          links.map((f) => (
            <li>
              <a href={resolveRelative(fileData.slug!, f.slug!)} class="internal">
                {f.frontmatter?.title}
              </a>
            </li>
          ))
        ) : (
          <li>No outlinks found</li>
        )}
      </ul>
    </div>
  )
}

Outlinks.css = style
export default (() => Outlinks) satisfies QuartzComponentConstructor
