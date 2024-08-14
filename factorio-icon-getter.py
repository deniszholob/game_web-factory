import requests
from bs4 import BeautifulSoup
import re

def extract_icons(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    images = soup.find_all('img')
    return {img['alt']: img['src'] for img in images if 'alt' in img.attrs}

def sanitize_name(name):
    # Remove file extensions and invalid characters, format names
    return re.sub(r'[^\w]', '', name).replace(' ', '').replace('png', '')

def format_display_name(name):
    # Format display names to be more readable
    return name.replace('.png', '').replace('-', ' ').title()

def write_to_ts_file(icons, file_path):
    FACTORIO_WIKI_URL ='https://wiki.factorio.com'
    with open(file_path, 'w') as file:
        # file.write('export const FACTORIO_WIKI_URL = \'{FACTORIO_WIKI_URL}\';\n')
        file.write('export enum FactorioWikiIcon {\n')
        for name in icons:
            sanitized_name = sanitize_name(name)
            file.write(f'  \'{sanitized_name}\' = \'{sanitized_name}\',\n')
        file.write('}\n')

        file.write('\n')
        file.write('export const FACTORIO_WIKI_ICON_OPTIONS: FactorioWikiIcon[] =\n')
        file.write(' Object.values(FactorioWikiIcon);\n')

        file.write('\n')
        file.write('export interface FactorioWikiIconInfo {\n')
        file.write('  id: FactorioWikiIcon;\n')
        file.write('  url: string;\n')
        file.write('  display: string;\n')
        file.write('}\n')

        file.write('\n')
        file.write('export const FACTORIO_WIKI_ICON_INFO: Record<FactorioWikiIcon, FactorioWikiIconInfo> = {\n')
        for name, src in icons.items():
            sanitized_name = sanitize_name(name)
            display_name = format_display_name(name)
            absolute_url = FACTORIO_WIKI_URL + src  # Replace with actual URL conversion if needed
            file.write(f'  [FactorioWikiIcon.{sanitized_name}]: {{\n')
            file.write(f'    id: FactorioWikiIcon.{sanitized_name},\n')
            file.write(f'    display: \'{display_name}\',\n')
            file.write(f'    url: \'{absolute_url}\',\n')
            file.write('  },\n')
        file.write('} as const;\n\n')


        file.write('\n')
        file.write('export const FACTORIO_WIKI_ICON_INFO_OPTIONS: FactorioWikiIconInfo[] =\n')
        file.write('  FACTORIO_WIKI_ICON_OPTIONS.map(\n')
        file.write('    (o: FactorioWikiIcon): FactorioWikiIconInfo => FACTORIO_WIKI_ICON_INFO[o],\n')
        file.write('  );\n')
        # file.write('  FACTORIO_WIKI_ICON_OPTIONS.map(getIconInfo);\n')

        # file.write('\n')
        # file.write('export function getIconInfo(icon: FactorioWikiIcon): FactorioWikiIconInfo {\n')
        # file.write('  const data: FactorioWikiIconInfo = { ...FACTORIO_WIKI_ICON_INFO[icon] };\n')
        # file.write('  if (data.url.startsWith(FACTORIO_WIKI_URL)) return data;\n')
        # file.write('  data.url = `${FACTORIO_WIKI_URL}${data.url}`;\n')
        # file.write('  return data;\n')
        # file.write('}\n')

# List of URLs to extract from
urls = [
    'https://wiki.factorio.com/Category:Icons',
    'https://wiki.factorio.com/Category:Game_images',
    'https://wiki.factorio.com/index.php?title=Category:Game_images&filefrom=Flammables+%28research%29.png#mw-category-media',
    'https://wiki.factorio.com/index.php?title=Category:Game_images&filefrom=Run-forrest-run-achievement.png#mw-category-media'
]

# Extract and combine icons from each URL
all_icons = {}
for url in urls:
    icons = extract_icons(url)
    all_icons.update(icons)

# Write to TypeScript file
write_to_ts_file(all_icons, 'src/app/shared/models/factorio-wiki-icon.enum.ts')
