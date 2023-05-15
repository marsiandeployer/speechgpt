export default {
  name: {
    filePath: 'src/components/Header.tsx',
    regex:
      /<span className="font-bold ml-2 decoration-purple-500 animate-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">(.*?)<\/span>/s,
    newContent: name =>
      `<span className="font-bold ml-2 decoration-purple-500 animate-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">${name}<\/span>`,
  },
  logo: {
    filePath: 'src/components/Header.tsx',
    regex: new RegExp(
      `<div className="flex flex-col sm:pt-20 sticky pt-16">
    (.*?)
    <div className="flex flex-row py-2 justify-between items-center w-full">`,
      's'
    ),
    newContent: src => `<div className="flex flex-col sm:pt-20 sticky pt-16">
    <img src='${src}' />
    <div className="flex flex-row py-2 justify-between items-center w-full">`,
  },
  titleAndLogo: {
    filePath: 'src/components/Header.tsx',
    regex: new RegExp(
      `<div className="flex flex-col sm:pt-20 sticky pt-16">
    (.*?)
    <div className="flex flex-row py-2 justify-between items-center w-full">
      <div className="text-2xl font-bold text-left bg-gray-100 text-gray-800">
        <span className="font-bold ml-2 decoration-purple-500 animate-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          (.*?)
        <\/span>
      <\/div>
      <div>
        <LanguageSelector \/>
        {\/\*<AppearanceSelector\/>\*\/}
      <\/div>
    <\/div>
  <\/div>`,
      's'
    ),
    newContent: (logo, name) => `<div className="flex flex-col sm:pt-20 sticky pt-16">
    ${logo}
    <div className="flex flex-row py-2 justify-between items-center w-full">
      <div className="text-2xl font-bold text-left bg-gray-100 text-gray-800">
        <span className="font-bold ml-2 decoration-purple-500 animate-text text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          ${name}
        </span>
      </div>
      <div>
        <LanguageSelector />
        {/*<AppearanceSelector/>*/}
      </div>
    </div>
  </div>`,
  },
};
